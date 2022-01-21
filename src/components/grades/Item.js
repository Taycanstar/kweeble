import React, { useState, useEffect } from "react";
import { addGrade, getGrades, deleteGrade } from "../services/gradesServices";
import { updateItem, deleteItem } from "../services/itemsServices";

const Item = ({ item, handleUpdateItems, handleCourseGrade, handleUpdateItemGrade }) => {
  const [gradeShow, setGradeShow] = useState(false);
  const [grades, setGrades] = useState([]);
  const [formVal, setFormVal] = useState({
    gradeName: "",
    grade: "",
  });
  const [itemGrade, setItemGrade] = useState(null);
  

  useEffect(() => {
    const loadGrades = async () => {
      try {
        const { data } = await getGrades();
        const filteredGrades = await data.filter(
          (grade) => grade.item === item._id
        );
        setGrades(filteredGrades);
        setItemGrade(item.itemGrade);
      } catch (error) {
        console.log(error);
      }
    };
    loadGrades();
  }, []);

  const showGrade = () => {
    setGradeShow(!gradeShow);
  };

 
  const handleItemGrade = async (myGrades) => {
    try {
      const numberOfGrades = myGrades.length;

      const totalGrades = myGrades
        .map((x) => x.grade)
        .reduce((a, b) => parseInt(a) + parseInt(b), 0);

      const finalAns = (totalGrades / (numberOfGrades * 100)) * 100;

      const {data} = await updateItem(item._id, { itemGrade: finalAns });

      const myData = {
    course: data.course,
    item: data.item,
     itemGrade: finalAns,
    percentage: data.percentage,
    user: data.user,
    _id: data._id
      }

      handleUpdateItemGrade(myData, item._id)
        
      console.log(data, "success");
      setItemGrade(finalAns);
      // setItemGrade(response.data.itemGrade)
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormVal({ ...formVal, [e.target.name]: e.target.value });
  };

 
  

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const userData = JSON.parse(localStorage.getItem("profile"));

      const { gradeName, grade } = formVal;

      const serverData = {
        item: item._id,
        user: userData._id,
        gradeName,
        grade,
      };

      const { data } = await addGrade(serverData);
        console.log(data, "grade added");
      setGrades((oldArr) => [...oldArr, data]);
      handleItemGrade([...grades, data]);
     handleCourseGrade()
  
   

      setFormVal({
        gradeName: "",
        grade: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteItem(id);
      handleUpdateItems(id);

      console.log("deleted", res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteGrade = async (id) => {
    try {
      const res = await deleteGrade(id);
      const deleted = grades.filter((grade) => grade._id !== id);
      setGrades(deleted);
      handleItemGrade(deleted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="listOfItems" onClick={showGrade}>
        <p className="single-item-item">{item.item}</p>
        <p className="single-item-item">{item.percentage}%</p>
        <button
          onClick={() => handleDelete(item._id)}
          className="delete-item-btn"
        >
          Delete
        </button>
        <p className="total-item-grade">{itemGrade} </p>
      </div>

      {gradeShow && (
        <div>
          <form onSubmit={handleSubmit} className="grade-form flex">
            <input
              className="search-grade-input"
              value={formVal.gradeName}
              name="gradeName"
              onChange={handleChange}
              type="text"
              placeholder="Enter task"
            />

            <input
              className="grade-number-input"
              value={formVal.grade}
              name="grade"
              onChange={handleChange}
              type="number"
              placeholder="Grade"
            />

            <button className="add-grade-btn">Add Grade</button>
          </form>

          <div>
            {grades.map((grade) => (
              <div key={grade._id} className="single-grade flex">
                <p className="grade-name">{grade.gradeName} </p>
                <p className="grade-grade">{grade.grade} </p>
                <button
                  className="delete-grade-btn"
                  onClick={() => handleDeleteGrade(grade._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
