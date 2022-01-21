import React, { useState } from 'react'
import AddItem from './AddItem'

const Grade = ({ course }) => {
  const [itemIsOpen, setItemIsOpen] = useState(false);
      const [courseGrade, setCourseGrade] = useState(null)


  const openItem = () => {
    setItemIsOpen(!itemIsOpen);
  };


 const getCourseGrade = (grade) => {
   setCourseGrade(grade)

 }


  return (
    <div>
      <div key={course._id} className="course-list" onClick={openItem}>
        <h5 className="single-class-item">{course.course}</h5>
          <h5>{courseGrade}</h5>
      </div>
      {itemIsOpen && <AddItem getCourseGrade={getCourseGrade} course={course._id}  />}
    </div>
  );
};

export default Grade
