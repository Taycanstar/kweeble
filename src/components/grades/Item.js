import React, { useState, useEffect } from "react";
import { addGrade, getGrades, deleteGrade } from "../services/gradesServices";
import { updateItem, deleteItem } from "../services/itemsServices";

const Item = ({
  item,
  course,
  handleUpdateItems,
  handleCourseGrade,
  handleUpdateItemGrade,
  handleDeleteItem,
}) => {
  const [gradeShow, setGradeShow] = useState(false);
  const [grades, setGrades] = useState([]);
  const [formVal, setFormVal] = useState({
    gradeName: "",
    grade: "",
  });

  useEffect(() => {
    const loadGrades = async () => {
      try {
        const { data } = await getGrades(course, item._id);
        setGrades(data);
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

      console.log(finalAns, "final answer");

      const { data } = await updateItem(course, item._id, {
        itemGrade: finalAns,
      });

      handleUpdateItemGrade(data, data._id);

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

      const { gradeName, grade } = formVal;
      const serverData = {
        gradeName,
        grade,
      };

      const { data } = await addGrade(course, item._id, serverData);


      setGrades(data.grades);
      handleItemGrade(data.grades);

      setFormVal({
        gradeName: "",
        grade: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteGrade = async (id) => {
    try {
      const { data } = await deleteGrade(course, item._id, id);
      console.log(data, "grade deleted");
      setGrades(data.grades);
      handleItemGrade(data.grades);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="listOfItems" onClick={showGrade}>
        <div className="item-first">
          <p className="single-item-item">{item.item}</p>
          <p className="single-item-item">{item.percentage}%</p>
        </div>

        <div className="item-second">
          <button
            onClick={() => handleDeleteItem(item._id)}
            className="delete-item-btn"
          >
            Delete
          </button>
          <p className="total-item-grade">{item.itemGrade} </p>
        </div>
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

            <button className="add-grade-btn">Add</button>
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
