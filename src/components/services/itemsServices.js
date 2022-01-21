import axios from "../../api/index";

export function getItems() {
  return axios.get("/auth/items");
}

export function addItem(item) {
  return axios.post("/auth/items", item);
}

export function updateItem(id, item) {
  return axios.put("/auth/items" + "/" + id, item);
}

export function deleteItem(id) {
  return axios.delete("/auth/items" + "/" + id);
}
