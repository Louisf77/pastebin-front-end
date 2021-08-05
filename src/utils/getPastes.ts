import { useState } from "react";

export default async function getPastes() {
  const [storedPastes, setStoredPastes] = useState({});
  try {
    const response = await fetch("http://localhost:4000/pastes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const body = await response.json();
    setStoredPastes(body);
  } catch (err) {
    console.error(err.message);
  }
}
