import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Items from "../users/items";
import GridContainer from "../layout/gridContainer";
import Pagination from "@mui/material/Pagination";
import Title from "../header/title";
import Box from "@mui/material/Box";
import useSWR from "swr";

interface User {
  id: number;
  avatar_url: string;
  name: string;
  username: string;
  profileUrl: string;
  login: string;
  html_url: string;
}

const fetcher = (url: string): Promise<User[]> =>
  fetch(url).then((res) => res.json());

export function Users() {
  const [page, setPage] = React.useState(1);
  const { isAuthenticated, isLoading } = useAuth0();

  const { data, error } = useSWR(
    `https://server-repos.onrender.com/api/users?page=${page}`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated)
    return <h2>Necesitas iniciar sesión para ver perfiles de usuarios.</h2>;

  if (error) return <h2>Error al cargar los perfiles.</h2>;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      {isAuthenticated && (
        <>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "row",
              gap: 1,
              width: { xs: "100%", md: "fit-content" },
              overflow: "auto",
            }}
          >
            <Title
              titleName="Latest Users"
              subtitle="Check out the latest users"
            />
          </Box>
          <GridContainer>
            {data ? (
              data.map((user: User) => (
                <Items
                  key={user.id}
                  id={user.id}
                  avatar={user.avatar_url}
                  name={user.name || user.login}
                  username={user.login}
                  profileUrl={user.html_url}
                />
              ))
            ) : (
              <div>Loading users...</div>
            )}
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
        </>
      )}
    </div>
  );
}
