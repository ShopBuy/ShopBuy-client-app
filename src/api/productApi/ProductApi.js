import axios from "axios";

const PRODUCT_API = "http://localhost:8080/api/home/";

export const findMoviesByName = async (name) => {
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
