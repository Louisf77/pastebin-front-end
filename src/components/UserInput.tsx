import { useState } from "react";

export default function UserInput(): JSX.Element {
  const [textBody, setTextBody] = useState("");
  const [title, setTitle] = useState("");
  const apiBaseURL = process.env.REACT_APP_API_BASE
  const onSubmit = async () => {
    try {
      const response = await fetch(apiBaseURL + "/pastes", {
        // const response = await fetch("http://localhost:4000/pastes", {
        method: "POST",
        body: JSON.stringify({ textbody: textBody, title: title }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <input
        className="titleinput"
        placeholder="Input your title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="pasteinput"
        type="form"
        placeholder="Paste text here....."
        value={textBody}
        onChange={(e) => setTextBody(e.target.value)}
      />
      <button onClick={onSubmit}>Save</button>
    </>
  );
}
