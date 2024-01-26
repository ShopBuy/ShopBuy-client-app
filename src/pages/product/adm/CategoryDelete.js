import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function CategoryDelete() {
  const CATEGORY_MANAGEMENT_API = "http://localhost:8080/api";
  const {categoryId} = useParams();
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      axios
        .get(`${CATEGORY_MANAGEMENT_API}/categories/${categoryId}`)
        .then((res) => {
          setCategory(res.data.data);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [categoryId]);

  function handleSubmit() {
    if (categoryId) {
      axios
        .delete(`${CATEGORY_MANAGEMENT_API}/admin/categories/${categoryId}`)
        .then((res) => {
          alert(` ${JSON.stringify(res.data)} `);
          // alert(`Xóa danh mục thành công!`);
          navigate("/adm/categories");
        })
        .catch((err) => {
          throw err;
        });
    }
  }

  function getCategories() {
    navigate("/adm/categories");
  }

  return (
    <div
      style={{
        width: "40%",
        textAlign: "center",
        margin: "auto",
        paddingTop: "50px",
      }}
    >
      <h1 style={{textAlign: "left"}}>Xóa danh mục</h1> <br/>

      <div style={{textAlign: "left"}}>

        <p>
          <b style={{marginRight: "20px"}}>Tên danh mục:</b>{category.name}
        </p>

        <p>
          <b style={{marginRight: "75px"}}>Giới tính:</b>{category.gender}
        </p>

        {/*<p>*/}
        {/*  <b style={{marginRight: "55px"}}>True-False:</b> {category.shown}*/}
        {/*</p>*/}


        <div></div>

        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-danger"
          style={{width: "100px"}}
        >
          Xóa
        </button>

        &nbsp;   &nbsp;

        <button
          type="button"
          onClick={getCategories}
          className="btn btn-info"
          style={{color: 'white', width: "100px"}}
        >
          Hủy
        </button>

      </div>
    </div>
  );
}

export default CategoryDelete;
