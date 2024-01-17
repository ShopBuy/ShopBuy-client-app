import axios from "axios";

const ADMIN_API = "http://localhost:8080/api/admin/";
export const findAllProduct = async () => {
    let result = null;
    try {
        result = await axios.get(`${ADMIN_API}all`, {
            headers: { }
        });
    } catch (e) {
        console.log("Find books API error: " + e);
    }
    console.log(result)
    return result?.data;
};

export const deleteProduct = async (ProductId) => {
    try {
        const response = await axios.delete(`${ADMIN_API}${ProductId}`);
        return response.data;
    } catch (error) {
        console.error("Delete movie API error: " + error);
    }
};

export const updateProduct = async (id, productData) => {
    let result = null;
    try {
        result = await axios.put(`${ADMIN_API}product/${id}`, productData, {
        });
    } catch (e) {
        console.log("Update movies API error: " + e);
    }
    return result?.data;
};
export const findProductsByIdAdmin = async (id) => {
    let result = null;
    try {
        result = await axios.get(`${ADMIN_API}product/${id}`, {
            headers: { }
        });
    } catch (e) {
        console.log("Find books API error: " + e);
    }
    return result?.data;
};
export const fetchCreateNewProduct = async (newMovie) => {
    try {
        await axios.post(`${ADMIN_API}create`,newMovie, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
            },
        });
        return true;
    } catch (e) {
        console.log("Create Movie API error: " + e);
        return false;
    }
}