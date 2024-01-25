import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {MdStarRate} from "react-icons/md";
import ReactPaginate from "react-paginate";


function ProductAll() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setProducts(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Lỗi lấy sản phẩm:', error);
            }
        };

        fetchProducts();
    }, []);

    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 15;
    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
        // console.log('Du lieu trang :', selected);
    };

    const indexOfLastProduct = (currentPage + 1) * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    // console.log('Index of First Product:', indexOfFirstProduct);
    // console.log('Index of Last Product:', indexOfLastProduct);

    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const pageCount = Math.ceil(products.length / productsPerPage);

    return (

        <div>
            <div className="product-list"
                 style={{
                     display: 'flex',
                     flexWrap: 'wrap',
                     justifyContent: 'center',
                 }}>

                {currentProducts.map((product) => (
                    <div key={product.id}
                         className="product-list shadow shadow-gray-500 "
                         style={{
                             margin: '10px ',
                             padding: '15px',
                             textAlign: 'center',
                             width: '25%',
                             boxSizing: 'border-box',
                             flexShrink: 0,
                         }}>

                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '200px', // Chiều cao cố định khung chứa ảnh
                            overflow: 'hidden',
                        }}>

                            {product.imageProductList && product.imageProductList.length > 0 ? (
                                <img
                                    src={product.imageProductList[0].url}
                                    alt={product.name}
                                    style={{
                                        // display: 'block',
                                        margin: 'auto',
                                        width: '100%',
                                        height: '100%', // ảnh đầy đủ kích thước trong khung chứa
                                        objectFit: 'cover', // ảnh không bị méo khi hiển thị
                                        // borderRadius: '8px',
                                    }}
                                />
                            ) : (

                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#ccc',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#666',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    No Image
                                </div>
                            )}
                        </div>

                        {product.variantList && product.variantList.length > 0 && (
                            <div className="product-details">

                                <p className="product-color" style={{margin: '3px'}}>
                                    {/*Màu: */}
                                    {Array.from(new Set(product.variantList.map(variant => variant.colorShowResponse ? variant.colorShowResponse.code : 'N/A'))).map((colorCode, index) => (
                                        <span key={index} style={{
                                            display: 'inline-block',
                                            width: '20px',
                                            height: '20px',
                                            backgroundColor: colorCode !== 'N/A' ? colorCode : 'transparent',
                                            marginRight: '5px',
                                            border: '1px solid #ccc',
                                            // borderRadius: '4px',
                                        }}></span>
                                    ))}
                                </p>

                                <div className="product-details"
                                     style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <p className="product-star"
                                    >
                                        {product.category.gender || 'N/A'}
                                    </p>

                                    <p className="product-size" style={{marginBottom: '5px'}}>
                                        {/*Size: */}
                                        {Array.from(new Set(product.variantList.map(variant => variant.sizeShowResponse ? variant.sizeShowResponse.name : 'N/A'))).join(', ')}
                                    </p>
                                </div>
                            </div>
                        )}


                        <p className="product-name"
                           style={{
                               fontWeight: 'bold',
                               marginBottom: '5px',
                               fontSize: '1.2em',
                               textAlign: 'left',
                               height: '3em', //  chiều cao cố định cho khung chứa
                               overflow: 'hidden',
                           }}>
                            {product.name || "Đang cập nhật"}
                        </p>


                        <p className="product-price"
                           style={{
                               color: '#e44d26',
                               textAlign: 'left',
                               fontSize: '1.4em',
                               fontWeight: 'bold'
                           }}>
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            }).format(product.price || 0)}
                        </p>

                        <p className="product-star"
                           style={{
                               color: '#ebbe01',
                               textAlign: 'left',
                               fontSize: '1.2em',
                               fontWeight: 'bold',
                               display: 'flex'
                           }}>
                            {Array.from({length: product.star}, (_, index) => (
                                <MdStarRate key={index} style={{marginRight: '2px'}}/>
                            ))}
                        </p>

                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center mt-5">
                <ReactPaginate
                    pageCount={Math.ceil(products.length / productsPerPage)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    previousLabel={<span>Back&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                    pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
                    pageClassName="mr-6"
                    containerClassName="flex text-base font-semibold font-titleFont py-10"
                    activeClassName="bg-black text-white"
                />

            </div>
            <p className="text-base font-normal text-lightText" style={{ textAlign: 'right' }}>
                {indexOfFirstProduct + 1} - {indexOfLastProduct} / {products.length}
            </p>
        </div>
    );
}


export default ProductAll;

