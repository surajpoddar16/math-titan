import React from 'react';

export function TimerProgress({progress}: { progress: number }) {
  return (
    <div className="app-timer">
      <div className="app-timer-icon">

      </div>
      <div className="progress-bar app-timer-progress">
        <div
          className="progress-bar-track"
          style={{width: progress * 100 + '%'}}>
        </div>
      </div>
    </div>
  );
}
