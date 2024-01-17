import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import React, { useEffect, useState } from "react";
import {findProductsByIdAdmin, updateProduct} from "../../api/adminApi/AdminApi";
import {findAllCategory} from "../../api/productApi/ProductApi";
import "../../assets/admin/updatecss.css"
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
    const [categoryList, setCategoryList] = useState([]);
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
                setCategoryList(response.data);
                setIsShowCategory(true);
            }
        } catch (error) {
            console.error('Failed to fetch Category', error);
        }
    }

    const handleCheckedCategory = (id) => {
        setProduct({
            ...product,
            categoryDto: { id: id }
        });
        setChecked(id)
        categoryList.forEach((category, index) => {
            if(category.id == product.categoryDto.id){
                setSubCategoryList(category.subCategories);
                setIsShowSubCategory(true)
            }
        })
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
        setProduct({ ...product, [name]: value });
    };
    if (!product) {
        return <div>Loading...</div>;
    }
    return (
        <div className="update-product-container">
            <h1>Update Product</h1>
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
                    type="text"
                    id="price"
                    name="price"
                    className="border"
                    value={product.price}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="stock">Stock :  </label>
                <input
                    type="text"
                    id="stock"
                    name="stock"
                    className="border"
                    value={product.stock}
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
                    <button type="button" className="border" onClick={fetchAllCategoryData}>Change Category</button>
                    </div>
                </>
                }

                <br />
                {isShownCategory ?
                    <>
                        <div className="subcategory-section">
                        <h1>Change Category</h1>
                        {categoryList?.map((cate, index) => (
                            <div className="form-check col-sm-4" key={index}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    defaultValue={cate.id}
                                    id="flexCheckDefault"
                                    onChange={() => handleCheckedCategory(cate.id)}
                                        checked = {checked == cate.id}
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    {cate.name}
                                </label>
                            </div>
                        ))}
                        <button type="button" className="border" onClick={() => {
                            setIsShowCategory(false);
                        }
                        }>Cancel Change Category</button>
                        </div>
                    </>
                    : ""}

                <br/>


                {isShownSubCategory ? "" :
                    <>
                        <label htmlFor="category">SubCategory :  </label>
                        <p
                        >
                            {product.subCategoryDto.name}
                        </p>
                    </>
                }

                <br />
                {isShownSubCategory ?
                    <>
                        <h1>Change SubCategory</h1>
                        {subCategoryList?.map((cate, index) => (
                            <div className="form-check col-sm-4" key={index}>
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
                        <button type="button" className="border" onClick={() => {
                            setIsShowSubCategory(false);
                        }
                        }>Cancel Change SubCategory</button>
                    </>
                    : ""}
                <br/>
                <button type="submit" className="submit-button" onClick={handleSubmit}>Update Product</button>
            </form>
        </div>
    );
}
export default UpdateProductPage;