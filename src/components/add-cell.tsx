import { useActions } from "../hooks/use-actions";
import { CellTypes } from "../state";
import "./add-cell.css";

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}
export const AddCell = ({ nextCellId, forceVisible = false }: AddCellProps) => {
  const { insertCellBefore } = useActions();

  const add = (type: CellTypes) => () => {
    insertCellBefore(nextCellId, type);
  };

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-small is-primary"
          onClick={add("code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          Code
        </button>
        <button
          onClick={add("text")}
          className="button is-rounded is-small is-primary"
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          Text
        </button>
      </div>

      <div className="divider" />
    </div>
  );
};
