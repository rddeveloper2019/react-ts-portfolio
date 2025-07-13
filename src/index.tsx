import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state";
import { RepositoriesList } from "./components/RepositoriesList";

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el!);

const App = () => {
  return (
    <Provider store={store}>
      <h1>Search for a package</h1>
      <RepositoriesList />
    </Provider>
  );
};

root.render(<App />);
