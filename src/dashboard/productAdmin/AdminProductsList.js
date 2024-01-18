import React, { useEffect, useState } from "react";
import {deleteProduct, findAllProduct} from "../../api/adminApi/AdminApi";
import '../../assets/admin/admincss.css';
import {useNavigate} from "react-router-dom";

function AdminProductsList() {
    const [productList, setProductList] = useState([]); // Corrected to useState
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const fetchProductList = async () => {
        try {
            let response = await findAllProduct(currentPage);
            setProductList(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (erro) {

        }
    }

    useEffect(() => {
        fetchProductList();
    }, [currentPage])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    console.log(productList);

    const handleDeleteProduct = async (ProductId) => {
        try {
            await deleteProduct(ProductId);
            setProductList(productList.filter(product => product.id !== ProductId));
        } catch (error) {
            // Xử lý lỗi tại đây
            console.error("Error deleting movie: " + error);
        }
    };

    const redirectToUpdateProductPage = (productId) => {
        navigate(`/admin/update/${productId}`);
    }
    const redirectToAddProductPage = ()=>{
        navigate(`/admin/add`);
    }

    const renderPagination = () => {
        return (
            <div className="pagination">
                {Array.from({length: totalPages}, (_, index) => (
                    <button
                        key={index}
                        disabled={index === currentPage}
                        onClick={() => handlePageChange(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        );
    };
    return(
        <div style={{marginLeft : 200, marginRight : 200}}>
            <table id="product">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th>DESCRIPTION</th>
                    <th>STAR</th>
                    <th>ACTION</th>
                </tr>
                </thead>
                <tbody>
                {productList?.map((product, index) => (
                    <tr key={index}>
                        <td>{product?.id}</td>
                        <td>{product?.name}</td>
                        <td>{product?.price}</td>
                        <td>{product?.stock}</td>
                        <td>{product?.description}</td>
                        <td>{product?.star}</td>
                        <td className="action-column">
                            <div className="button-container">
                                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                <button onClick={() => redirectToUpdateProductPage(product.id)}>Update</button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {renderPagination()}
            <div>
                <button type="button" className="submit-button" onClick={redirectToAddProductPage}>ADD Product</button>
            </div>
        </div>

    );
}
export default AdminProductsList;