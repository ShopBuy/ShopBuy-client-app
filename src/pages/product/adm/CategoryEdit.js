import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
// import "../asset/product.css";
// import "bootstrap/dist/css/bootstrap.min.css";

function CategoryEdit() {
  const CATEGORY_MANAGEMENT_API = "http://localhost:8080/api/admin";
  const {categoryId} = useParams();
  const isCreate = !categoryId;
  const [category, setCategory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      axios
        .get(`http://localhost:8080/api/categories/${categoryId}`)
        .then((response) => {
          if (response.data && response.data.data) {

            console.log(response.data);
            setCategory(response.data.data);


          } else {
            console.error("Invalid or missing data in the response:", response);
          }
        })
        .catch((error) => {
          // Xử lý lỗi
          console.error("Error while fetching category:", error);
          throw error;
        });
    }
  }, [categoryId]);

  function handleChange(event) {
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit() {
    axios
      .put(`${CATEGORY_MANAGEMENT_API}/categories/${categoryId}`, category)
      .then((response) => {
        alert(
          `${JSON.stringify(
            response.data
          )} `
        );
        navigate("/adm/categories");
      })
      .catch((err) => {
        throw err;
      });
  }


  function getCatgories() {
    navigate("/adm/categories");
  }

  return (
    <div
      style={{
        width: "40%",
        margin: "auto",
        paddingTop: "50px",
      }}
    >
      <h1>Cập nhật danh mục</h1>
      <form>
        <div>
          <label>Id: </label>
          <br/>
          <input
            readOnly
            name="id"
            value={category.id || ""}
            className="form-control"
          />
        </div>
        <br/>

        <div>
          <label>Tên danh mục</label>
          <br/>
          <input
            name="name"
            value={category.name || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <br/>


        <div style={{display: 'flex', width: '100%'}}>
          <div style={{flex: '1', marginRight: '20px'}}>
            <label>Giới tính</label>
            <input
              name="gender"
              type="text"
              value={category.gender || ""}
              onChange={handleChange}
              className="form-control"
              required
              style={{width: '100%'}}
            />
          </div>

          <div style={{flex: '1'}}>
            <label>True-False</label>
            <input
              name="shown"
              type="text"
              value={category.shown || ""}
              onChange={handleChange}
              className="form-control"
              required
              style={{width: '100%'}}
            />
          </div>
        </div>
        <br/>


        <br/>

        <div style={{textAlign: "left"}}>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
            style={{width: "100px"}}
          >
            Cập nhật
          </button>

          &nbsp;   &nbsp;

          <button
            type="button"
            onClick={getCatgories}
            className="btn btn-danger"
            style={{width: "100px"}}
          >
            Hủy
          </button>

        </div>
      </form>
    </div>
  );
}

export default CategoryEdit;
