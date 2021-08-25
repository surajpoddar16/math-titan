import { CellPosition } from './interface';
import { NumberData } from './NumbersGrid';

export class NumbersMatrix {
  constructor(
    public gridRows = 5,
    public gridColumns = 5,
    public matrix: NumberData[][] = []
  ) {
  }

  insertNextRow(data: number[]) {
    data.forEach((item, index) => {
      if (!this.matrix[index]) {
        this.matrix[index] = [];
      }

      this.matrix[index].unshift({ value: item, selected: false});
    });
  }

  addToSelection(position: CellPosition) {
    this.matrix[position.column][position.row].selected = true;
  }

  removeFromSelection(position: CellPosition) {
    this.matrix[position.column][position.row].selected = false;
  }

  clearSelection() {
    this.matrix.forEach((column, columnIndex) => {
      column.forEach((cell, rowIndex) => {
        if (cell) {
          cell.selected = false;
        }
      });
    });
  }

  getSelectedData() {
    const selection: number[] = [];

    this.matrix.forEach((column, columnIndex) => {
      column.forEach((cell, rowIndex) => {
        if (cell.selected) {
          selection.push(cell.value);
        }
      });
    });

    return selection;
  }

  getSelectedCellPositions() {
    const selection: CellPosition[] = [];

    this.matrix.forEach((column, columnIndex) => {
      column.forEach((cell, rowIndex) => {
        if (cell.selected) {
          selection.push({
            column: columnIndex,
            row: rowIndex
          });
        }
      });
    });

    return selection;
  }

  removeCells(cellPositions: CellPosition[]) {
    cellPositions.forEach((position) => {
      this.matrix[position.column][position.row] = null;
    });

    this.matrix.forEach((column, index) => {
      this.matrix[index] = column.filter((cell) => !this._isCellEmpty(cell))
    });
  }

  isMatrixColumnFilled(column: NumberData[]) {
    return column.length === this.gridRows
      && column.every((cell) => !this._isCellEmpty(cell));
  }

  reset() {
    this.clearSelection();
    this.matrix = [];
  }

  private _isCellEmpty(cell: NumberData) {
    return cell === null;
  }
}
