import { Fragment } from "react/jsx-runtime";
import { useAppSelector } from "../hooks/use-app-selector";
import { AddCell } from "./add-cell";
import { CellListItem } from "./cell-list-item";

export const CellList = () => {
  const cells = useAppSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      <AddCell nextCellId={null} forceVisible={cells.length < 1} />
    </div>
  );
};
