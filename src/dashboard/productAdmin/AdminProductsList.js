import React, {useCallback, useEffect, useState} from "react";
import {deleteProduct, findAllProduct} from "../../api/adminApi/AdminApi";
import '../../assets/admin/admincss.css';
import {Link, useNavigate} from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function AdminProductsList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deletingProductId, setDeletingProductId] = useState(null);
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const fetchProductList = async (page) => {
        try {
            let response = await findAllProduct(page);
            setProductList(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (erro) {

        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user == null) {
            navigate("/login")
        }
        if(user?.roleId == 1){
            fetchProductList(currentPage);
        }else {
            navigate("/unauthorized")
        }

    }, [currentPage])


    const handleDeleteProduct = (productId) => {
        setDeletingProductId(productId);
        setIsModalOpen(true);
    };
    const confirmDeleteProduct = async () => {
        if (deletingProductId === null) return;

        try {
            await deleteProduct(deletingProductId);
            setProductList(productList.filter(product => product.id !== deletingProductId));
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error deleting product: " + error);
        }
    };

    const redirectToUpdateProductPage = (productId) => {
        navigate(`/admin/update/${productId}`);
    }
    const redirectToAddProductPage = ()=>{
        navigate(`/admin/add`);
    }
    const redirectToHomePage=()=>{
        navigate(`/`)
    }
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchProductList(newPage);
    };
    const handleFirstPage = () => {
        setCurrentPage(0);
        fetchProductList(0);
    };
    const handleLastPage = () => {
        const lastPageIndex = totalPages - 1;
        setCurrentPage(lastPageIndex);
        fetchProductList(lastPageIndex);
    };
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            fetchProductList(newPage);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            fetchProductList(newPage);
        }
    };
    const renderPagination = () => {
        return (
            <div className="pagination-container">
                <button
                    className="page-button"
                    onClick={handleFirstPage}
                    disabled={currentPage === 0}
                >
                    First Page
                </button>
                <button
                    className="page-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`page-button ${index === currentPage ? 'active-page' : ''}`}
                        onClick={() => handlePageChange(index)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="page-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                >
                    Next
                </button>
                <button
                    className="page-button"
                    onClick={handleLastPage}
                    disabled={currentPage === totalPages - 1}
                >
                    Last Page
                </button>
            </div>
        );
    };
    return(
        <>
            <header className="admin-header">
                <button className="home-button" onClick={redirectToHomePage}>HOME</button>
                <button className="home-button">
                    <Link to="/adm/categories" className="home-button">
                        CATEGORY
                    </Link>
                </button>
                <h1 className="page-title">Product Management</h1>
            </header>
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
                    <th>  <button type="button" className="submit-button" onClick={redirectToAddProductPage}>ADD Product</button></th>
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
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    type="button" className="submit-button-detele"
                                >
                                    Delete
                                </button>
                                <Modal
                                    open={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    aria-labelledby="delete-confirmation-title"
                                    aria-describedby="delete-confirmation-description"
                                >
                                    <Box sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: 400,
                                        bgcolor: 'background.paper',
                                        boxShadow: 24,
                                        p: 4, // padding
                                    }}>
                                        <h2 id="delete-confirmation-title">Confirm Delete</h2>
                                        <p id="delete-confirmation-description">
                                            Are you sure you want to delete this product?
                                        </p>
                                        <Button onClick={confirmDeleteProduct}>Confirm</Button>
                                        <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    </Box>
                                </Modal>
                                <button
                                    onClick={() => redirectToUpdateProductPage(product.id)}
                                    type="button" className="submit-button"
                                >
                                    Update
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {renderPagination()}
            <div>

            </div>
        </div>

        </>
    );
}
export default AdminProductsList;