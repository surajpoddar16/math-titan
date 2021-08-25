import { useEffect, useState } from 'react';
import { GameController } from './game-controller';
import { CellPosition, GameState } from './interface';
import { NumberData } from './NumbersGrid';

export function useGameLogic(gridColumns: number, gridRows: number, timeoutDuration: number) {
  const [gameController] = useState(new GameController(
    gridColumns,
    gridRows,
    timeoutDuration,
    (p) => {
      setProgress(p);
    },
    (state: GameState) => {
      setGameState(state)
    },
    (total: number) => {
      setTotalScore(total);
    },
    (gameController: GameController) => {
      setNumbersMatrix([...gameController.matrix.matrix]);
      setCurrentTarget(gameController.mathsExecutor.currentTarget);
      setCurrentTargetProgress(gameController.mathsExecutor.currentProgress);
    }
  ));

  const [gameState, setGameState] = useState(gameController.gameState);
  const [currentTarget, setCurrentTarget] = useState(gameController.mathsExecutor.currentTarget);
  const [currentTargetProgress, setCurrentTargetProgress] = useState(gameController.mathsExecutor.currentProgress);
  const [totalScore, setTotalScore] = useState(gameController.totalScore);
  const [numbersMatrix, setNumbersMatrix] = useState<NumberData[][]>(gameController.matrix.matrix);
  const [progress, setProgress] = useState(gameController.timer.progress);

  const onNumberClick = (cellPosition: CellPosition) => {
    if (gameState === GameState.ENDED) {
      return;
    }

    gameController.execute(cellPosition);
  };

  useEffect(() => {
    gameController.startGame();
  }, [ gameController ]);

  return {
    gameState,
    currentTarget,
    currentTargetProgress,
    totalScore,
    numbersMatrix,
    progress,
    onNumberClick
  }
}
