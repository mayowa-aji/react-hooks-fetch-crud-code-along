import React from "react";

function Item({ item, handleUpdatedItem, handleDeletedItems }) {

  const handleUpdateCart = () => {
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({isInCart: !item.isInCart})
    }
    fetch(`http://localhost:4000/items/${item.id}`, configObj)
    .then((response) => response.json())
    .then((updatedItem) => handleUpdatedItem(updatedItem))

  }

  const handleDeleteItem = () => {
    const configObj = {
      method : "DELETE",
    }
    fetch(`http://localhost:4000/items/${item.id}`, configObj)
    .then(response => response.json())
    .then(updatedItem => handleDeletedItems(item))
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick= {handleUpdateCart} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick={handleDeleteItem} className="remove">Delete</button>
    </li>
  );
}

export default Item;
