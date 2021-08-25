import { CellPosition, GameState } from './interface';
import { Timer } from './timer';
import { NumbersMatrix } from './numbers-matrix';
import { MathsExecutor } from './maths-executor';

export class GameController {
  gameState: GameState = GameState.NEW;
  totalScore = 0;

  timer: Timer;
  matrix: NumbersMatrix;
  mathsExecutor: MathsExecutor;

  constructor(
    public columns: number,
    public rows: number,
    public timeoutDuration: number,
    public timerProgressListener: (progress: number) => void,
    public gameStateChangeListener: (state: GameState) => void,
    public totalScoreListener: (totalScore: number) => void,
    public matrixUpdateListener: (gameController: GameController) => void
  ) {
    this.timer = new Timer(
      timeoutDuration,
      100,
      this._timerEndListener.bind(this),
      timerProgressListener
    );

    this.matrix = new NumbersMatrix(rows, columns);

    this.mathsExecutor = new MathsExecutor();
  }

  private _timerEndListener() {
    if (this.shouldEndGame()) {
      this.endGame();
    } else {
      this.getNextRow();
    }
  };

  startGame() {
    this.gameState = GameState.STARTED;
    this.totalScore = 0;
    this.matrix.reset();
    this.gameStateChangeListener(this.gameState);
    this.totalScoreListener(this.totalScore);
    this.getNext();
  }

  endGame() {
    this.gameState = GameState.ENDED;
    this.matrix.clearSelection();
    this.timer.endTimer();
    this.gameStateChangeListener(this.gameState);
    this.matrixUpdateListener(this);
  }

  execute(cellPosition: CellPosition) {
    if (this.matrix.matrix[cellPosition.column][cellPosition.row].selected) {
      this.matrix.removeFromSelection(cellPosition);
    } else {
      this.matrix.addToSelection(cellPosition);
    }

    this.mathsExecutor.setSelectionProgress(this.matrix.getSelectedData() as number[]);
    const selectionResult = this.mathsExecutor.compareSelectionProgress();

    if (selectionResult < 0) {
      this.matrixUpdateListener(this);
    }

    if (selectionResult === 0) {
      this.totalScore += 1;
      this.totalScoreListener(this.totalScore);
      this.matrix.removeCells(this.matrix.getSelectedCellPositions());

      this.getNext();
    }

    if (selectionResult > 0) {
      if (this.shouldEndGame()) {
        this.endGame();
      } else {
        this.getNext();
      }
    }
  }

  getNext() {
    this.matrix.clearSelection();

    this.mathsExecutor.setNewTarget();

    this.getNextRow();
  }

  getNextRow() {
    this.matrix.insertNextRow(this.mathsExecutor.getNewRow(this.columns));
    this.timer.startTimer();
    this.matrixUpdateListener(this);
  }

  shouldEndGame() {
    return this.matrix.matrix.some((column) => {
      return this.matrix.isMatrixColumnFilled(column);
    })
  }
}
