import { useParams } from "react-router-dom";
import RepoDetailsCard from "./repoDetails";
import useSWR from "swr";

interface RepoData {
  name: string;
  description: string;
  owner: {
    avatar_url: string;
    login: string;
  };
  html_url: string;
  stargazers_count: string;
  updated_at: string;
}

const fetcher = (url: string): Promise<RepoData> =>
  fetch(url).then((res) => res.json());

function Repo() {
  const { owner, repo } = useParams();
  console.log(owner, repo);

  const { data, error, isLoading } = useSWR(
    `https://server-repos.onrender.com/api/repositories/${owner}/${repo}`,
    fetcher
  );
  console.log(data);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>no data available</div>;

  // render data
  return (
    <>
      <RepoDetailsCard
        name={data.name}
        description={data.description}
        ownerAvatar={data.owner.avatar_url}
        ownerName={data.owner.login}
        repoUrl={data.html_url}
        stargazers_count={data.stargazers_count}
        updated_at={data.updated_at}
      />
    </>
  );
}

export default Repo;
