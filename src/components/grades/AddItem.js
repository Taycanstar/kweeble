import React, { useState, useEffect } from 'react'
import Item from './Item'
import {addItem, getItems} from '../services/itemsServices'

const AddItem = ({ filteredItems, course, getCourseGrade }) => {

    const [formVal, setFormVal] = useState({
      item: "",
      percentage: ""
    });

    const [items, setItems] = useState([])
  

  console.log(course, "course")

  const handleUpdateItems = (id) => {
    const updated = items.filter(item => item._id !== id)
    
    setItems(updated)
  }

  const handleUpdateItemGrade = (grade, id) => {
    const updated = items.map(item => item._id === id ? grade : item  )
    console.log("updated ===>", updated);
    setItems(updated)
  }




    const handleChange = (e) => {
         setFormVal({...formVal, [e.target.name]: e.target.value})
         console.log(formVal)
    };


     const handleCourseGrade = () => {

 const totalGrades2 = items.map((x) => x.percentage * x.itemGrade)
       console.log(totalGrades2, "items from handlecourse");

      const totalGrades = items.map((x) => x.percentage * x.itemGrade)
          .reduce((a, b) => parseInt(a) + parseInt(b), 0);
         

            console.log(items, "ggrades");

          const totalPercentages = items
            .map((x) => x.percentage)
            .reduce((a, b) => parseInt(a) + parseInt(b), 0);


            const finalAnswer = totalGrades / totalPercentages;
             getCourseGrade(finalAnswer)
           

          
  };



  useEffect(() => {
    const loadItems = async () => {
      try {
            const userData = JSON.parse(localStorage.getItem("profile"));
        const { data } = await getItems();
       const filteredItems2 = data.filter(item => item.course === course && userData._id === item.user )
       setItems(filteredItems2);
   } catch (error) {
        console.log(error);
      }
    };
    loadItems();
  }, []);




    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {

      const profile = JSON.parse(localStorage.getItem("profile"));


    const {item, percentage} = formVal

          const serverData = {
                course,
                item,
                percentage,
                itemGrade: "",
                user: profile._id
          }
      
      const {data} = await addItem(serverData)

      console.log(data, "success")

    setItems((oldArr) => [...oldArr, data])

      setFormVal({
          item: "",
          percentage: ""
      })

     
      } catch (error) {
        console.log(error);
      }
      
    };

    console.log(items, "items")

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
            <Item handleUpdateItemGrade={handleUpdateItemGrade} handleCourseGrade={handleCourseGrade} handleUpdateItems={handleUpdateItems} item={item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddItem
