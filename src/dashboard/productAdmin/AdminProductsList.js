import React, { useEffect, useState } from "react";
import {findAllProduct} from "../../api/adminApi/AdminApi";
import '../../assets/admin/admincss.css';
function AdminProductsList() {
    const [productlist, setProductList] = useState([]); // Corrected to useState
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    // const navigate = useNavigate();

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
    console.log(productlist);


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
            {/* Các thẻ <br/> có thể được loại bỏ nếu không cần thiết */}
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
                {productlist?.map((product, index) => (
                    <tr key={index}>
                        <td>{product?.id}</td>
                        <td>{product?.name}</td>
                        <td>{product?.price}</td>
                        <td>{product?.stock}</td>
                        <td>{product?.description}</td>
                        <td>{product?.star}</td>
                        {/* ACTION cột có thể được thêm vào sau */}
                    </tr>
                ))}
                </tbody>
            </table>
            {renderPagination()}
        </div>
    );
}
export default AdminProductsList;