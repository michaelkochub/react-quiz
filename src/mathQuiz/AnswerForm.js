import React from 'react';

function AnswerForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <label>
        <input type="text" autoFocus value={props.value} onChange={props.handleChange} />
      </label>
    </form>
  );
}

export default AnswerForm;