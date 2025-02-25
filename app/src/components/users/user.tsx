import { useParams } from "react-router-dom";
import UserDetailsCard from "./userDetails";
import useSWR from "swr";

interface UserData {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  html_url: string;
  updated_at: string;
  public_repos: number;
}

const fetcher = (url: string): Promise<UserData> =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

function User() {
  const { username } = useParams();
  const { data, error, isLoading } = useSWR(
    `https://server-repos.onrender.com/api/users/${username}`,
    fetcher
  );
  console.log(data);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  if (!data) return null;

  // render data
  return (
    <>
      <UserDetailsCard
        avatar={data.avatar_url}
        name={data.name}
        login={data.login}
        bio={data.bio}
        profileUrl={data.html_url}
        updated_at={data.updated_at}
        repos={data.public_repos}
      />
    </>
  );
}

export default User;
