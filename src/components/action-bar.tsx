import "./action-bar.css";
import { useActions } from "../hooks/use-actions";
import { Cell } from "../state";

interface ActionBarProps {
  id: Cell["id"];
}

export const ActionBar = ({ id }: ActionBarProps) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => {
          moveCell(id, "up");
        }}
      >
        <span className="icon">
          <i className="fas fa-arrow-up" />
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => {
          moveCell(id, "down");
        }}
      >
        <span className="icon">
          <i className="fas fa-arrow-down" />
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => {
          deleteCell(id);
        }}
      >
        <span className="icon">
          <i className="fas fa-times" />
        </span>
      </button>
    </div>
  );
};
