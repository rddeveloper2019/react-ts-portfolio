import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useAppActions } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

export const RepositoriesList: FC = () => {
  const [term, setTerm] = useState("");
  const { searchRepositories } = useAppActions();
  const { error, loading, data } = useAppSelector(
    ({ repositories }) => repositories
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    searchRepositories(term);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={onChange} />
        <button>Search</button>
      </form>
      {error && <h3>Error: {error}</h3>}
      {loading && <h3>Loading ...</h3>}
      {!loading && !error && data && (
        <ol>
          {data.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ol>
      )}
    </div>
  );
};
