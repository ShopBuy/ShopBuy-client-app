import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function CategoryAdd() {
  const CATEGORY_MANAGEMENT_API = "http://localhost:8080/api/admin";
  const {categoryId} = useParams();
  const isCreate = !categoryId;
  const [category, setCategory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      axios
        .get(`${CATEGORY_MANAGEMENT_API}/categories/${categoryId}`)
        .then((response) => {
          setCategory(response.data);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [categoryId]);

  function handleChange(event) {
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    });
  }

  function getBackCategoryList() {
    navigate("/adm/categories");
  }

  function handleSubmit() {
    axios
      .post(`${CATEGORY_MANAGEMENT_API}/categories`, category)
      .then((res) => {
        alert(
          `${JSON.stringify(
            res.data
          )}`
        );
        // window.location.href = "/";
        navigate("/adm/categories");
      })
      .catch((err) => {
        throw err;
      });
  }

  return (
    <div
      style={{
        width: "40%",
        // textAlign: "center",
        margin: "auto",
        paddingTop: "50px",
      }}
    >
      <h1>Thêm danh mục</h1>
      <form>
        <div>
          <label>Tên danh mục</label>
          <br/>
          <input
            name="name"
            value={category.name || ""}
            onChange={handleChange}
            placeholder="Tên danh mục"
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
              // type="text"
              value={category.gender || ""}
              onChange={handleChange}
              placeholder="Giới tính"
              className="form-control"
              required
              style={{width: '100%'}}
            />
          </div>
          <div style={{flex: '1'}}>
            <label>True-False</label>
            <input
              name="shown"
              // type="text"
              value={category.shown || ""}
              onChange={handleChange}
              placeholder="True-False"
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
            style={{ width: "100px" }}
          >
            Thêm
          </button>

          &nbsp;  &nbsp;

          <button
            type="button"
            onClick={getBackCategoryList}
            className="btn btn-danger"
            style={{ width: "100px" }}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryAdd;
