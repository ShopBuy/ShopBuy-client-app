import {useNavigate, useParams} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import {findProductsByIdAdmin, updateProduct} from "../../api/adminApi/AdminApi";
import {findAllCategory} from "../../api/productApi/ProductApi";
import "../../assets/admin/updatecss.css"
import {forEach} from "react-bootstrap/ElementChildren";
function UpdateProductPage() {
    let { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
        star: '',
        isDeleted: false,
        categoryDto: { id: '', name: '', gender: '', isShown: true },
        subCategoryDto: { id: '', name: '', isShown: true
        },
        imageProductListDto: [],
        variantListDto: []
    });
    const [isShownCategory , setIsShowCategory] = useState(false);
    const [isShownSubCategory , setIsShowSubCategory] = useState(false);
    const [categoryList, setCategoryList] = useState({
        female : [],
        male : [],
        children : []
    });
    // const [categoryList, setCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [checked, setChecked] = useState();

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await findProductsByIdAdmin(productId);
                setProduct(response.data);
            } catch (error) {
                console.error('Failed to fetch product', error);
            }
        };
        fetchProductData();
    }, [productId]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(product)
        try {
            await updateProduct(productId, product);
            navigate('/admin');
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };
    const fetchAllCategoryData = async () =>{
        try {
            const response = await findAllCategory();
            if (response !== null) {
                let category = {
                    male: [],
                    female: [],
                    children: []
                };
                response.data?.forEach((data, index) => {
                    if (data.gender === "NỮ") {
                        category.female.push(data);
                    } else if (data.gender === "NAM") {
                        category.male.push(data);
                    } else if (data.gender === "TRẺ EM") {
                        category.children.push(data);
                    }
                });
                setCategoryList(category);
                setIsShowCategory(true);
                setIsShowSubCategory(true);
            }
        } catch (error) {
            console.error('Failed to fetch Category', error);
        }
    }
    console.log(categoryList)
    const handleCheckedCategory = (cate) => {
        setProduct({
            ...product,
            categoryDto: { id: cate?.id }
        });
        setChecked(cate?.id)
        setIsShowSubCategory(true)
        setSubCategoryList(cate?.subCategories)
    };
    const handleCheckedSubCategory = (id) => {
        const isChecked = subCategories.includes(id);
        if (isChecked) {
            subCategories.map((cate, index) => {
                for (let index = 0; index < subCategories.length; index++) {
                    if (subCategories[index] === id) {
                        subCategories.splice(index, 1);
                    }
                }
            })

        } else {
            subCategories.push(id);

        }
        setProduct({
            ...product,
            subCategoryDto: subCategories
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if ((name === 'price' || name === 'stock' || name ==='star') && parseFloat(value) < 1) {
            alert("Please enter a non-negative value.");
            return;
        }

        setProduct({ ...product, [name]: value });
    };

    const handleCancelChangeCategory = () => {
        setIsShowSubCategory(false);
        setIsShowCategory(false);
    }
    if (!product) {
        return <div>Loading...</div>;
    }
    const redirectToAdminPage=()=>{
        navigate(`/admin`)
    }
    return (
        <div className="update-product-container">
            <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>Update Product</h1>
            <form onSubmit={handleSubmit} className="product-form">
                <label htmlFor="name">Name :  </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="border"
                    value={product.name}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="price">Price :  </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    className="border"
                    value={product.price}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="stock">Stock :  </label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    className="border"
                    value={product.stock}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="star">star :  </label>
                <input
                    type="number"
                    id="star"
                    name="star"
                    className="border"
                    value={product.star}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="description">Description :  </label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    className="border"
                    value={product.description}
                    onChange={handleChange}
                />
                <br />
                {isShownCategory ? "" :
                <>
                    <div className="category-section">
                    <label htmlFor="category">Category :  </label>
                    <p
                    >
                        {product.categoryDto.name}
                    </p>

                    </div>
                </>
                }

                <br />
                {isShownCategory ? (
                    <>
                        <div className="subcategory-section">
                            <h1>Change Category</h1>
                            {Object.entries(categoryList).map(([key, value]) => (
                                <fieldset>
                                    <legend className="category-title">{key}:</legend>
                                    {value?.map((cate, index) => (
                                        <div key={index} className="category-item">
                                            <input
                                                type="radio"
                                                id={`category-${key}-${index}`}
                                                onChange={() => handleCheckedCategory(cate)}
                                                checked = {checked == cate.id}
                                            />
                                            <label htmlFor={`category-${key}-${index}`}>
                                                {cate.name}
                                            </label>
                                        </div>
                                    ))}
                                </fieldset>
                            ))}
                            <button type="button" className="border" onClick={handleCancelChangeCategory}>
                                Cancel Change Category
                            </button>
                        </div>
                    </>
                ) : ""}

                <br/>


                {isShownSubCategory ? "" :
                    <>
                        <label htmlFor="category">SubCategory :  </label>
                        <p
                        >
                            {product.subCategoryDto.name}
                        </p>
    <br/>
                        <button type="button" className="border" onClick={fetchAllCategoryData}>Change Category</button>
                    </>
                }

                <br />
                {isShownSubCategory ?
                    <>
                        <h1>Change SubCategory</h1>
                        {subCategoryList?.map((cate, key) => (
                            <div className="form-check col-sm-4" key={key}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultValue={cate.id}
                                    id="flexCheckDefault"
                                    onChange={() => handleCheckedSubCategory(cate.id)}
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    {cate.name}
                                </label>
                            </div>
                        ))}
                    </>
                    : ""}
                <br/>
                <button type="submit" className="submit-button" onClick={handleSubmit}>Update Product</button>
                <br/>
                <br/>
                <button type="submit" className="submit-button" onClick={redirectToAdminPage}>Back</button>
            </form>
        </div>
    );
}
export default UpdateProductPage;