import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Form } from "./form";
import Latest from "../layout/layout";
import GridContainer from "../layout/gridContainer";

interface Repo {
  id: number;
  name: string;
  description?: string;
  html_url: string;
  stargazers_count: number;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: async () => {
      const response = await axios.get(
        `https://server-repos.onrender.com/api/search`,
        {
          params: {
            type: "repositories",
            query: searchTerm,
            per_page: 10,
            page: 1,
          },
        }
      );
      return response.data;
    },
    enabled: !!searchTerm,
  });

  return (
    <>
      <Form searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error.message}</p>}

      {results && (
        <GridContainer>
          {results.map((repo: Repo) => (
            <Latest
              key={repo.id}
              repo={repo.name}
              id={repo.id.toString()}
              icon={repo.owner.avatar_url} // Puedes agregar un ícono si es necesario
              html_url={repo.html_url} // URL del repositorio
              description={repo.description || "No description available"} // Descripción
              stargazers_count={repo.stargazers_count} // Número de estrellas
              owner={repo.owner?.login || "Unknown"}
              full_name={repo.full_name} // Usuario propietario
            />
          ))}
        </GridContainer>
      )}
    </>
  );
}
