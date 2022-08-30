import React from "react";
import CategoryItem from "../category-item/CategoryItem";
import './directory.styles.scss'
const Directory = ({ catergories }) => {
  return (
    <div className='directory-container'>
      {catergories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
