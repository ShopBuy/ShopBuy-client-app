import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";


function CategoryList() {
  const {categoryId} = useParams();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((response) => {

        console.log(response.data);
        setCategories(response.data.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  function handleCreate() {
    navigate("/adm/categories/add");
  }

  const [currentPage, setCurrentPage] = useState(0);
  const categoryPerPage = 12;
  const handlePageChange = ({selected}) => {
    setCurrentPage(selected);
    // console.log('Du lieu trang :', selected);
  };

  const indexOfLastProduct = (currentPage + 1) * categoryPerPage;
  const indexOfFirstProduct = indexOfLastProduct - categoryPerPage;
  // console.log('Index of First Product:', indexOfFirstProduct);
  // console.log('Index of Last Product:', indexOfLastProduct);

  const currentCategories = categories.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageCount = Math.ceil(categories.length / categoryPerPage);

  return (

    <div
      style={{
        width: "40%",
        textAlign: "center",
        margin: "auto",
        paddingTop: "50px",
      }}
    >
      <div>
        <h1 style={{textAlign: 'left'}}>DANH MỤC</h1>
        <button
          type="button"
          onClick={handleCreate}
          style={{marginLeft: "80%",
            marginBottom: "20px",
            width: "150px"}}
          className="btn btn-primary"
        >
          Thêm danh mục
        </button>
      </div>

      <table
        border={2}
        className="table table-hover "
        style={{textAlign: "left"}}
      >
        <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Danh mục</th>
          <th style={{textAlign: "right", paddingRight: "100px"}}>Giới tính</th>
          {/*<th style={{textAlign: "right"}}>Hiện-ẩn</th>*/}

         <th colSpan={2}>
          </th>

        </tr>
        </thead>

        <tbody>
        {currentCategories.map((category) => (
          <tr key={category.id}>
            <td style={{verticalAlign: 'middle'}}>{category.id}</td>
            <td style={{verticalAlign: 'middle'}}>
              <a
                href={`/adm/categories/${category.id}`}
                style={{textDecoration: "none", color: "black"}}
              >
                {category.name}
              </a>
            </td>
            <td style={{textAlign: "right", paddingRight: "100px", verticalAlign: 'middle'}}>
              {category.gender}{" "}
            </td>
            {/*<td style={{textAlign: "right", verticalAlign: 'middle'}}>{category.shown? 'Yes' : 'No'} </td>*/}
            <td style={{textAlign: "right"}}>
              <button className="btn btn-success"style={{ width: "100px" }}>
                <Link
                  to={`/adm/categories/edit/${category.id}`}
                  style={{textDecoration: "none", color: "white"}}
                >
                  Cập nhật
                </Link>
              </button>
            </td>
            <td>
              <button className="btn btn-danger "style={{ width: "100px" }}>
                <Link
                  to={`/adm/categories/delete/${category.id}`}
                  style={{textDecoration: "none", color: "white"}}
                >
                  Xóa
                </Link>
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-5">
        <ReactPaginate
          pageCount={Math.ceil(categories.length / categoryPerPage)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          previousLabel={<span>Back&nbsp;</span>}
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

      </div>

    </div>

  );
}

export default CategoryList;
