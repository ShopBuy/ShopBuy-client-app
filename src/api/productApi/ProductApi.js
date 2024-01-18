import axios from "axios";

const PRODUCT_API = "http://localhost:8080/api/home/";

export const findProductsByName = async (name) => {
    let result = null;
    try {
        result = await axios.get(`${PRODUCT_API}search?name=${name}&type=all`, {
            headers: { }
        });
    } catch (e) {
        console.log("Find books API error: " + e);
    }
    return result?.data;
};

export const findProductsById = async (id) => {
    let result = null;
    try {
        result = await axios.get(`${PRODUCT_API}product/${id}`, {
            headers: { }
        });
    } catch (e) {
        console.log("Find books API error: " + e);
    }
    return result?.data;
};
export const findAllCategory = async () => {
    let result = null;
    try {
        result = await axios.get(`${PRODUCT_API}category/all`, {
            headers: { }
        });
    } catch (e) {
        console.log("Find books API error: " + e);
    }
    return result?.data;
};