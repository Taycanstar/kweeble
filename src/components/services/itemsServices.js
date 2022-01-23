import axios from "../../api/index";

export function getItems(course_id) {
  return axios.get(`/auth/items/${course_id}`);
}

export function addItem(item, course_id) {
  return axios.post(`/auth/items/${course_id}`, item);
}

export function updateItem(course_id, item_id, item) {
  return axios.put(`/auth/items/${course_id}/${item_id}`, item);
}

export function deleteItem(course_id, id) {
  return axios.delete(`/auth/items/${course_id}/${id}`);
}
