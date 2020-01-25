import React from 'react';

const toDoInput = props => {
  return (
    <form onSubmit={props.submitHandler}>
      <label>Add a new to-do</label>
      <input type="text" />
      <button id="submit">Submit</button>
    </form>
  );
};

export default toDoInput;
