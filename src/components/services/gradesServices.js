import axios from "../../api/index";

export function getGrades() {
  return axios.get("/auth/grades");
}

export function addGrade(grade) {
  return axios.post("/auth/grades", grade);
}

export function deleteGrade(id) {
  return axios.delete("/auth/grades" + "/" + id);
}
