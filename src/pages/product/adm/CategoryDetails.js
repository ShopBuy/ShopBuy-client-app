import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function CategoryDetails() {
  const {categoryId} = useParams();
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
      <h1>THÔNG TIN DANH MỤC </h1>
      <button
        type="button"
        onClick={getCategories}
        style={{marginLeft: "80%", marginBottom: "20px", width: "150px"}}
        className="btn btn-success"
      >
        Danh mục
      </button>
      <div style={{textAlign: "left"}}>

        <p>
          <b style={{marginRight: "20px"}}>Tên danh mục:</b> {category.name}
        </p>

        <p>
          <b style={{marginRight: "75px"}}>Giới tính:</b> {category.gender}
        </p>

        <p>
          <b style={{marginRight: "55px"}}>True-False:</b> {category.shown ? 'True' : 'False'}
        </p>



      </div>
    </div>
  );
}

export default CategoryDetails;
