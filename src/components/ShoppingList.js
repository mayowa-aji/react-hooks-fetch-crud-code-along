import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);


  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then((response) => response.json())
    .then((items) => setItems(items))
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const handleAddItem = (newItem) => {
    setItems([...items, newItem])

  }
  const handleUpdatedItem = (updatedItem) => {
    const updatedItems = items.map((item) => {
      if(item.id === updatedItem.id) {
        return updatedItem
      } else {
        return item
      }
    })
    setItems(updatedItems)
  }

  const handleDeletedItems = (updatedItem) => {
    const updatedItems = items.filter((item) => item.id !== updatedItem.id)
    setItems(updatedItems)

  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm handleAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            handleUpdatedItem={handleUpdatedItem}
            handleDeletedItems={handleDeletedItems}
            key={item.id}
            item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
