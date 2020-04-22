import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get("/repositories").then((response) => {
      console.log(response);
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repositorie = {
      title: `New repo ${Date.now()}`,
      url: 'https://google.com',
      techs: ['Node', 'ReactJS', 'Java']
    }

    const newRepositorie = await api.post('/repositories',repositorie);

    setRepositories([...repositories, newRepositorie.data]);
  }

  async function handleRemoveRepository(id) {
    const newRepositories = repositories.filter(
      (repositorie) => repositorie.id !== id
    );

    setRepositories(newRepositories);
    try {
      await api.delete(`/repositories/${id}`);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repositorie) => (
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
