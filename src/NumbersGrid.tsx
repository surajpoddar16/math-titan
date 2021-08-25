import React from 'react';
import { CellPosition } from './interface';

export type NumberData = {
  selected: boolean;
  value: number;
};

interface NumberGridSizeProps {
  disabled: boolean;
  gridRows: number;
  gridColumns: number;
  numbersMatrix: NumberData[][];
  onNumberClick: (cellPosition: CellPosition) => void;
}

export function NumbersGrid(
  {
    disabled,
    gridRows,
    gridColumns,
    numbersMatrix,
    onNumberClick
  }
  : NumberGridSizeProps
) {
  return (
    <div className={`app-numbers-grid ${disabled ? 'app-numbers-grid-disabled' : ''}`}>
      <div className="app-numbers-grid-numbers">
        {
          Array.from(Array(gridColumns).keys()).map((column) => {
            return (
              <div className="app-number-grid-numbers-column">
                {
                  Array.from(Array(gridRows).keys()).map((row) => {
                    const hasNumber = numbersMatrix && numbersMatrix[column] && numbersMatrix[column][row];

                    return (
                      <div className="app-number-grid-numbers-cell-wrapper">
                        {
                          (() => {
                            if (hasNumber) {
                              const selected = numbersMatrix[column][row].selected;

                              return (
                                <div
                                  className={`number-card number-card-md app-number-grid-numbers-cell ${selected ? 'app-number-grid-numbers-cell-selected' : ''}`}
                                  onClick={() => { onNumberClick({ row, column }); }}>
                                  {numbersMatrix[column][row].value}
                                </div>
                              );
                            }

                            return <></>;
                          })()
                        }

                        <div
                          className={`number-card number-card-md app-number-grid-numbers-cell-bg ${hasNumber ? 'app-number-grid-numbers-active-cell-bg' : ''}`}>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
