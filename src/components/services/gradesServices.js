import axios from "../../api/index";

export function getGrades(course_id, item_id) {
  return axios.get(`/auth/grades/${course_id}/${item_id}`);
}

export function addGrade(course_id, item_id, grade) {
  return axios.post(`/auth/grades/${course_id}/${item_id}`, grade);
}

export function deleteGrade(course_id, item_id, grade_id) {
  return axios.delete(`/auth/grades/${course_id}/${item_id}/${grade_id}`);
}
