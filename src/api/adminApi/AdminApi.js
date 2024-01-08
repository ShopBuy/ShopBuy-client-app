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
