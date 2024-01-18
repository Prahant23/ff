import axios from "axios";
const Api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const createProductAPI = (formData) =>
  Api.post("/api/product/create_product", formData, config);

export const getAllProductsAPI = () => Api.get("/api/product/get_products");

export const getSingleProductAPI = (id) =>
  Api.get(`/api/product/get_product/${id}`);

export const updateProductAPI = (id, formData) =>
  Api.put(`/api/product/update_product/${id}`, formData, config);

export const deleteProductAPI = (id) =>
  Api.delete(`/api/product/delete_product/${id}`, config);
