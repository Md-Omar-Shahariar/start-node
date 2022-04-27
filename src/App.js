import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    //send data
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUsers = [...users, data];
        setUser(newUsers);
        console.log(data);
      });

    console.log(name, email);
  };

  return (
    <div className="App">
      <h2>My Own data: {users.length}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" placeholder="Name" />
        <input type="text" name="email" id="" placeholder="Email" />
        <input type="submit" value="Submit" />
      </form>
      {users.map((user) => (
        <li key={user.id}>
          Name: {user.name} Email: {user.email}
        </li>
      ))}
    </div>
  );
}

export default App;
