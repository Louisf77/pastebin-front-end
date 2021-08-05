import { useEffect, useState } from "react";
import { IPaste } from "../utils/types";

export default function SavedPastes(): JSX.Element {
  const [storedPastes, setStoredPastes] = useState<IPaste[]>([]);
  async function getPastes() {
    try {
      const response = await fetch("http://localhost:4000/pastes");
      const body = await response.json();
      console.log(body);
      setStoredPastes(body.data.pastes);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    getPastes();
  }, []);
  return (
    <>
      <h2>Saved Pastes</h2>
      {storedPastes.map((obj) => (
        <li key={obj.paste_id}>{obj.paste_text}</li>
      ))}
    </>
  );
}
