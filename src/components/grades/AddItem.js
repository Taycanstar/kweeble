import React, { useState, useEffect } from "react";
import Item from "./Item";
import { addItem, deleteItem, getItems } from "../services/itemsServices";
import { updateCourse } from "../services/classServices";

const AddItem = ({ filteredItems, course, getCourseGrade, updateCourses }) => {
  const [formVal, setFormVal] = useState({
    item: "",
    percentage: "",
  });

  const [items, setItems] = useState([]);

  const handleUpdateItems = (id) => {
    const updated = items.filter((item) => item._id !== id);
    setItems(updated);
  };

  const handleCourseGrade = async (myItems) => {
    console.log("items in course grade ===>", myItems);
    const totalGrades = myItems
      .map((x) => x.percentage * x.itemGrade)
      .reduce((a, b) => parseInt(a) + parseInt(b), 0);

    const totalPercentages = myItems
      .map((x) => x.percentage)
      .reduce((a, b) => parseInt(a) + parseInt(b), 0);

    const finalAnswer = totalGrades / totalPercentages;

    const { data } = await updateCourse(course, {
      courseGrade: finalAnswer,
    });

    updateCourses(course, data);
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(course, id);
      const filtered = items.filter((item) => item._id !== id);
      setItems(filtered);
      handleCourseGrade(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateItemGrade = (grade, id) => {
    const updated = items.map((item) => (item._id === id ? grade : item));
    setItems(updated);
    handleCourseGrade(updated)
  };

  const handleChange = (e) => {
    setFormVal({ ...formVal, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const loadItems = async () => {
      try {
        const { data } = await getItems(course);
        setItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { percentage, item } = formVal;

      const serverData = {
        item,
        percentage,
        itemGrade: "",
      };

      const { data } = await addItem(serverData, course);
      console.log(data, "item added");
      setItems(data);
      handleCourseGrade(data);

      setFormVal({
        item: "",
        percentage: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div className="item-search">
          <form onSubmit={handleSubmit} className=" search-form flex">
            <input
              type="text"
              value={formVal.item}
              required={true}
              onChange={handleChange}
              placeholder="Item"
              className="search-item-input"
              name="item"
            />
            <input
              type="number"
              value={formVal.percentage}
              required={true}
              onChange={handleChange}
              placeholder="weight"
              className="item-weight-input"
              name="percentage"
            />

            <button className="addItem-btn" type="submit">
              Add Item
            </button>
          </form>
        </div>
        <div className="items-list">
          {items.map((item, i) => (
            <Item
              handleUpdateItemGrade={handleUpdateItemGrade}
              handleCourseGrade={handleCourseGrade}
              handleUpdateItems={handleUpdateItems}
              handleDeleteItem={handleDeleteItem}
              item={item}
              key={i}
              course={course}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddItem;
