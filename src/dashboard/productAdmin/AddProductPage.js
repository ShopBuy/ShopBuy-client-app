import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {fetchCreateNewProduct} from "../../api/adminApi/AdminApi";
import "../../assets/admin/updatecss.css"
import {findAllCategory} from "../../api/productApi/ProductApi";
import {useNavigate} from "react-router-dom";
function AddProductPage() {
    const navigate = useNavigate();
    const initialProductState = {
        name: '',
        price: '',
        stock: '',
        description: '',
        star: '',
        isDeleted: false,
        categoryDto: { id: '', name: '', gender: '', isShown: true },
        subCategoryDto: { id: '', name: '', isShown: true },
        imageProductListDto: [],
        variantListDto: []
    };

    const [product, setProduct] = useState(initialProductState);
    const [categoryList, setCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [checked, setChecked] = useState();
    const [subCateChecked, setSubCateChecked] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };


    const fetchAllCategoryData = async () =>{
        try {
            const response = await findAllCategory();
            if (response !== null) {
                setCategoryList(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch Category', error);
        }
    }

    const handleCheckedCategory = (id) => {
        setChecked(id)
        setProduct({
            ...product,
            categoryDto: { id: id }
        });

        categoryList.forEach((category, index) => {
            if(category.id == id){
                setSubCategoryList(category.subCategories);
            }
        })
    };
    const handleCheckedSubCategory = (id) => {
        setSubCateChecked(id);
        setProduct(prevProduct => ({
            ...prevProduct,
            subCategoryDto: { id: id }
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetchCreateNewProduct(product);
            navigate('/admin');
            console.log('Product added:', response.data);

        } catch (error) {
            console.error('Failed to add product:', error);
        }
        console.log(product)
    };
    useEffect(()=> {
        fetchAllCategoryData();
    },[])
    return (
        <div className="update-product-container">
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
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
                <label htmlFor="description">Description :  </label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    className="border"
                    value={product.description}
                    onChange={handleChange}
                />
                <div className="subcategory-section">
                    <h1>Category :  </h1>
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
                </div>
                <div>
                    <h3>SubCategory</h3>
                    {subCategoryList?.map((cate, index) => (
                        <div className="form-check col-sm-4" key={index}>
                            <input
                                className="form-check-input"
                                type="radio"
                                defaultValue={cate.id}
                                id="flexCheckDefault"
                                onChange={() => handleCheckedSubCategory(cate.id)}
                                checked = {subCateChecked == cate.id}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                 {cate.name}
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit" className="submit-button" onClick={handleSubmit}>Add Product</button>
            </form>
        </div>
    );
}

export default AddProductPage;
