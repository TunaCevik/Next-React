import classes from "./NewPost.module.css";
import { useState } from "react";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
function NewPost({ onAddPost }) {
  const [enteredBody, setEnteredBody] = useState("");
  const [enteredAuth, setEnteredAuth] = useState("");
  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }
  function authChangeHandler(event) {
    setEnteredAuth(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const postData = {
      body: enteredBody,
      author: enteredAuth,
    };
    onAddPost(postData);
    onCancel();
  }
  return (
    <Modal>
      <form className={classes.form} onSubmit={submitHandler}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" required rows={3} onChange={bodyChangeHandler} />
        </p>

        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" required onChange={authChangeHandler} />
        </p>
        <p className={classes.actions}>
          <Link to="..">Cancel</Link>
          <button type="submit">Submit</button>
        </p>
      </form>
    </Modal>
  );
}

export default NewPost;
