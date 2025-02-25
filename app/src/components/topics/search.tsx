import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FormTopics } from "./form";
import Latest from "../layout/layout";
import GridContainer from "../layout/gridContainer";

interface Repo {
  id: number;
  name: string;
  short_description?: string;
  released: string;
  stargazers_count: number;
  full_name: string;
  created_by: string;
  score: string;
}

export default function SearchTopics() {
  const [topic, setTopic] = useState("");

  const {
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["search", topic],
    queryFn: async () => {
      const response = await axios.get(
        `https://server-repos.onrender.com/api/search/topics`,
        {
          params: { query: topic },
        }
      );
      return response.data;
    },
    enabled: !!topic, // Solo ejecuta la consulta si hay un topic
  });

  return (
    <>
      {/* Pasamos setTopic para que el formulario pueda actualizarlo */}
      <FormTopics setTopic={setTopic} />

      {isLoading && <p>Loading...</p>}
      {error && (
        <p>
          Something went wrong:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      )}

      {results && results.length > 0 ? (
        <GridContainer>
          {results.map((repo: Repo) => (
            <Latest
              repo={repo.name}
              id={repo.score}
              icon={repo.score} // Imagen del owner
              html_url={repo.released} // Enlace al repo
              description={repo.short_description || "No description available"} // Descripción
              stargazers_count={repo.stargazers_count} // Estrellas
              owner={repo.created_by || "Unknown"} // Dueño del repo
              full_name={repo.created_by} // Nombre completo del repo
            />
          ))}
        </GridContainer>
      ) : (
        <span></span>
      )}
    </>
  );
}
