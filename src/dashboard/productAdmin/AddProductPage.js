import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {fetchCreateNewProduct, findProductsByIdAdmin, updateProduct} from "../../api/adminApi/AdminApi";
import "../../assets/admin/updatecss.css"
import {findAllCategory} from "../../api/productApi/ProductApi";
import {useNavigate} from "react-router-dom";
function AddProductPage() {
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
    const [checkSubCate, setCheckedSubCate] = useState();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
       if(user == null) {
           navigate("/login")
       }
       if(user?.roleId == 1){
           fetchAllCategoryData()
       }else {
           navigate("/unauthorized")
       }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetchCreateNewProduct(product);
            navigate('/admin');
            console.log('Product added:', response.data);

        } catch (error) {
            console.error('Failed to add product:', error);
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
            }
        } catch (error) {
            console.error('Failed to fetch Category', error);
        }
    }

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
        setProduct({
            ...product,
            subCategoryDto: { id: id }
        });
        setCheckedSubCate(id);
    }
    const redirectToAdminPage=()=>{
        navigate(`/admin`)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if ((name === 'price' || name === 'stock' || name === 'star') && parseFloat(value) < 1) {
            alert("Please enter a non-negative value.");
            return;
        }

        setProduct({ ...product, [name]: value });
    };

    if (!product) {
        return <div>Loading...</div>;
    }
    return (
        <div className="update-product-container">
            <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>ADD Product</h1>
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
                <label htmlFor="star">Stock :  </label>
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

                        </div>
                    </>
                <br/>


                {isShownSubCategory ?
                    <>
                        <h1>Change SubCategory</h1>
                        {subCategoryList?.map((cate, key) => (
                            <div className="form-check col-sm-4 subcategory-item" key={key}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultValue={cate.id}
                                    id="flexCheckDefault"
                                    onChange={() => handleCheckedSubCategory(cate.id)}
                                    checked = {checkSubCate == cate.id}
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

export default AddProductPage;


