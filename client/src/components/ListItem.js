import React from 'react';

const listItem = props => {
  const clickHandler = event => {
    const _id = event.target.parentNode.id;
    const todoItem = event.target.parentNode.childNodes[1].value;
    const isCompleted = event.target.parentNode.childNodes[0].checked;
    const eventName = event.target.id;
    props.listHandler(eventName, { _id, todoItem, isCompleted });
  };

  return (
    <div id={props.index}>
      <input id="CheckBox" type="checkbox" defaultChecked={props.isCompleted} onClick={clickHandler} />
      <input key={props.defaultValue} type="text" defaultValue={props.defaultValue} />
      <button id="Edit" onClick={clickHandler}>Edit</button>
      <button id="Delete" onClick={clickHandler}>Delete</button>
    </div>
  );
};

export default listItem;
