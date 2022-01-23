import axios from "../../api/index";

export function getCourses(){
    return axios.get("/auth/courses")
}

export function addCourses(course){
    return axios.post("/auth/courses", course)
}

export function updateCourse(id, course){
    return axios.put("/auth/courses" + "/" + id, course)
}

export function deleteCourse(id) {
  return axios.delete("/auth/courses" + "/" + id);
}