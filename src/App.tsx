import React from "react";
import "./styles.css";
import Modal from "./modal/index";

export default function App() {
  const [open, setOpen] = React.useState(false);

  const toggleBtn = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={() => toggleBtn()}>Open Button 1 </button>
      <button onClick={() => toggleBtn()}> Open Button 2 </button>
      <Modal open={open}>
        <div className="modal-cntner">
          <h2>My Modal Dialog</h2>
          <button onClick={() => toggleBtn()} tabIndex={0}>
            Close
          </button>
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
        </div>
      </Modal>
    </div>
  );
}
