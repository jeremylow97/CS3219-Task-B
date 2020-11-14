// handle all the api calls here

import axios from "axios";

const apiUrl = "http://localhost:8080/api";


const addGroceryItem = async (groceryDetails) => {
    const response = await axios.post(apiUrl, groceryDetails);

    return response;
}

const getAllGroceryItems = async () => {
    const response = await axios.get(apiUrl);
    return response;
}

const editGroceryItem = async(itemId, groceryDetails) => {
    const response = await axios.put(`${apiUrl}/${itemId}`, groceryDetails);
    return response;
}

const deleteGroceryItem = async(itemId) => {
    const response = await axios.delete(`${apiUrl}/${itemId}`);
    return response;
}

export default {
    addGroceryItem,
    getAllGroceryItems,
    editGroceryItem,
    deleteGroceryItem
}