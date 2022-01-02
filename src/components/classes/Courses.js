import { Component } from "react";
import {
    addCourses,
    getCourses,
    updateCourse,
    deleteCourse,
} from "../services/classServices";

class Courses extends Component {
    state = { courses: [], currentCourse: "" };

    async componentDidMount() {
        try {
            const { data } = await getCourses();
            this.setState({ courses: data });
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = ({ currentTarget: input }) => {
        this.setState({ currentCourse: input.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const originalCourses = this.state.courses;
        try {
            const { data } = await addCourses({ course: this.state.currentCourse });
            const courses = originalCourses;
            courses.push(data);
            this.setState({ courses, currentCourse: "" });
        } catch (error) {
            console.log(error);
        }
    };

    handleUpdate = async (currentCourse) => {
        const originalCourses = this.state.courses;
        try {
            const courses = [...originalCourses];
            const index = courses.findIndex((course) => course._id === currentCourse);
            courses[index] = { ...courses[index] };
            courses[index].completed = !courses[index].completed;
            this.setState({ courses });
            await updateCourse(currentCourse, {
                completed: courses[index].completed,
            });
        } catch (error) {
            this.setState({ tasks: originalCourses });
            console.log(error);
        }
    };

    handleDelete = async (currentCourse) => {
        const originalCourses = this.state.courses;
        try {
            const courses = originalCourses.filter(
                (course) => course._id !== currentCourse
            );
            this.setState({ courses });
            await deleteCourse(currentCourse);
        } catch (error) {
            this.setState({ courses: originalCourses });
            console.log(error);
        }
    };
}

export default Courses;
