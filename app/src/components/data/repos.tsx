import React from "react";
import useSWR from "swr";
import Latest from "../layout/layout";
import GridContainer from "../layout/gridContainer";
import Pagination from "@mui/material/Pagination";
import Title from "../header/title";
import Box from "@mui/material/Box";
import Search from "../search/search";
import SearchTopics from "../topics/search";

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

const fetcher = (url: string): Promise<Repo[]> =>
  fetch(url).then((res) => res.json());

export function Repos() {
  const [page, setPage] = React.useState(1);
  const { data, error } = useSWR(
    `https://server-repos.onrender.com/api/repositories?page=${page}`,
    fetcher
  );
  console.log(data);
  if (error) return <div>Error fetching users</div>;
  if (!data) return <div>Loading...</div>;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Title
          titleName="Latest Repositories"
          subtitle="Check out the latest repositories"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            width: "100%",
            justifyContent: "space-between",
            alignItems: { xs: "start", md: "center" },
            gap: 4,
            overflow: "auto",
          }}
        >
          <SearchTopics />
          <Search />
        </Box>
        <GridContainer>
          {data.map((repo: Repo) => (
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
        <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
          <Pagination
            page={page}
            onChange={handleChange}
            hidePrevButton
            hideNextButton
            count={10}
            boundaryCount={10}
          />
        </Box>
      </Box>
    </div>
  );
}
