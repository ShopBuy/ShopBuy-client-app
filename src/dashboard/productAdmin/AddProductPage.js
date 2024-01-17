import React, { useState } from 'react';
import axios from 'axios';
import {fetchCreateNewProduct} from "../../api/adminApi/AdminApi";

function AddProductPage() {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };


    const handleCategoryChange = (e) => {
        setProduct({ ...product, categoryDto: { ...product.categoryDto, [e.target.name]: e.target.value }});
    };

    const handleSubCategoryChange = (e) => {
        setProduct({ ...product, subCategoryDto: { ...product.subCategoryDto, [e.target.name]: e.target.value }});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetchCreateNewProduct(product);
            console.log('Product added:', response.data);

        } catch (error) {
            console.error('Failed to add product:', error);
        }
    };

    return (
        <div>
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
                <div>
                    <h3>Category</h3>
                    <label htmlFor="categoryName">Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        name="name"
                        value={product.categoryDto.name}
                        onChange={handleCategoryChange}
                    />
                    {/* Add other category fields like gender, isShown, etc. */}
                </div>
                <div>
                    <h3>SubCategory</h3>
                    <label htmlFor="subCategoryName">Name:</label>
                    <input
                        type="text"
                        id="subCategoryName"
                        name="name"
                        value={product.subCategoryDto.name}
                        onChange={handleSubCategoryChange}
                    />

                </div>
                <button type="submit" className="submit-button" onClick={handleSubmit}>Add Product</button>
            </form>
        </div>
    );
}

export default AddProductPage;
