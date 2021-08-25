import React from 'react';
import './App.css';
import { NumbersGrid } from './NumbersGrid';
import { TimerProgress } from './TimerProgress';
import { useGameLogic } from './useGameLogic';
import { GameState } from './interface';

function App() {
  const gridColumns = 6;
  const gridRows = 5;
  const timeoutDuration = 15000;

  const {
    gameState,
    currentTarget,
    currentTargetProgress,
    totalScore,
    numbersMatrix,
    progress,
    onNumberClick
  } = useGameLogic(gridColumns, gridRows, timeoutDuration);

  return (
    <div className="app">
      <div className="app-body">
        <div className="app-header">
          {
            (() => {
              if (gameState !== GameState.ENDED) {
                return (
                  <div className="app-current-target-wrapper">
                    <div
                      className="number-card number-card-lg number-card-bg-primary number-card-shadow app-current-target-required">{currentTarget}</div>
                    <div
                      className="number-card number-card-lg number-card-shadow app-current-target-progress">{currentTargetProgress}</div>
                  </div>
                )
              } else {
                return (
                  <div className="app-game-over">
                    Game Over
                  </div>
                );
              }
            })()
          }

          <div className="app-total-score">
            { gameState === GameState.ENDED ? 'Final ' : '' }Score: {totalScore}
          </div>

          <TimerProgress progress={progress}/>
        </div>

        <NumbersGrid
          disabled={gameState === GameState.ENDED}
          gridRows={gridRows}
          gridColumns={gridColumns}
          numbersMatrix={numbersMatrix}
          onNumberClick={onNumberClick}/>
      </div>
    </div>
  );
}

export default App;
