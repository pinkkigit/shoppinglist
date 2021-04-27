import axios from "axios";
const baseUrl = "http://localhost:3001/api/lists";

const getAll = (id, itemId) => {
  const request = axios.get(`${baseUrl}/${id}/items`);
  return request.then((response) => response.data);
};

const create = (id, newObject) => {
  const request = axios.post(`${baseUrl}/${id}/items`, newObject);
  return request.then((response) => response.data);
};

const update = (id, itemId, newObject) => {
  const request = axios.put(`${baseUrl}/${id}/items/${itemId}`, newObject);
  return request.then((response) => response.data);
};

const remove = (id, itemId) => {
  const request = axios.delete(`${baseUrl}/${id}/items/${itemId}`);
  return request.then((response) => response.data);
};

const removeMany = (id) => {
  const request = axios.delete(`${baseUrl}/${id}/manyItems/`);
  return request.then((response) => response.data);
};

const removeAll = (id) => {
  const request = axios.delete(`${baseUrl}/${id}/items/`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, remove, removeAll, removeMany };
