"use client";
import { Console } from 'console';
import countdown from './countdown.min.js'
import { useState } from "react";

function Timer({ hours, minutes, seconds }) {
  return <span className="w-screen text-9xl text-center align-middle"><span id='hours'>{hours}</span>:<span id='minutes'>{minutes}</span>:<span id='seconds'>{seconds}</span></span>;
}

function Score({ value }) {
  return <p className="text-center">{value}</p>;
}

function AddPoints({ classes, inc, on2ptsClick}) {
  return <button className={classes} onClick={on2ptsClick}>{inc}pts</button>;
}

function FunnyEvent({ value, onFunnyEventClick }) {
  return <button className="rounded-full" onClick={onFunnyEventClick}>{value}</button>;
}

function StartCountdown({ value, onStartCountdownEventClick }) {
  return <button className="bg-orange-500" onClick={onStartCountdownEventClick}>{value}</button>;
}

function ResetCountdown({ value, onResetCountdownEventClick }) {
  return <button className="bg-red-500" onClick={onResetCountdownEventClick}>{value}</button>;
}

export default function Scoreboard() {  
  const [scoreBlue, setScoreBlue] = useState(0);
  const [scoreRed, setScoreRed] = useState(0);
  const initialTimerState = {hours: "24", minutes: "00", seconds: "00"};
  const [timer, setTimer] = useState(initialTimerState);
  var timerId;

  function incScore(inc, score, setScore) {
    setScore(Math.max(0, score + inc));
  }

  function launchCountdown() {
    console.log("launch countdown");
    const inADay = Date.now() + (5 * 1000) // (24 * 60 * 60 * 1000);
    timerId = countdown(
      function (ts) {
        setTimer({
          hours: ((ts.hours < 10) ? "0" : "") + ts.hours,
          minutes: ((ts.minutes < 10) ? "0" : "") + ts.minutes,
          seconds: ((ts.seconds < 10) ? "0" : "") + ts.seconds
        });

        if (ts.hours == 0 && ts.minutes == 0 && ts.seconds == 0) {
          window.clearInterval(timerId);
          console.log("game over"); // TODO: send 'game over' throug  h websocket          
        }
      },
      inADay,
      countdown.HOURS | countdown.MINUTES | countdown.SECONDS
    );
  }

  function resetCountdown() {
    console.log("reset countdown");
    window.clearInterval(timerId);
    setTimer(initialTimerState);
  }

  function playSong(song) {
    // TODO: play song  
    console.log(song);
  }

  return (
    <>
      <div className="flex flex-row">
        <div className="h-48">
          <Timer hours={timer.hours} minutes={timer.minutes} seconds={timer.seconds} />
        </div>
        <div>
          <StartCountdown value="start timer" onStartCountdownEventClick={launchCountdown} /><br/>
          <ResetCountdown value="reset timer" onResetCountdownEventClick={resetCountdown} />
        </div>
      </div>
      <div className="flex flex-row">    
        <div className="basis-1/2 h-screen bg-blue-500">
          <Score value={scoreBlue} />
          <div className="grid gap-4 grid-cols-2">
            <AddPoints classes={'rounded-full bg-green-500'} inc={+2} on2ptsClick={() => incScore(2, scoreBlue, setScoreBlue)} />
            <AddPoints inc={-2} on2ptsClick={() => incScore(-2, scoreBlue, setScoreBlue)} />
            <AddPoints inc={+3} on2ptsClick={() => incScore(3, scoreBlue, setScoreBlue)} />
            <AddPoints inc={-3} on2ptsClick={() => incScore(-3, scoreBlue, setScoreBlue)} />
            <FunnyEvent value={'airball'} onFunnyEventClick={() => playSong('airball')}/>
          </div>
        </div>
        <div className="basis-1/2 h-screen bg-red-500">
          <Score value={scoreRed} />
          <div className="grid gap-4 grid-cols-2">
            <AddPoints classes={'rounded-full bg-green-500'} inc={+2} on2ptsClick={() => incScore(2, scoreRed, setScoreRed)} />
            <AddPoints inc={-2} on2ptsClick={() => incScore(-2, scoreRed, setScoreRed)} />
            <AddPoints inc={+3} on2ptsClick={() => incScore(3, scoreRed, setScoreRed)} />
            <AddPoints inc={-3} on2ptsClick={() => incScore(-3, scoreRed, setScoreRed)} />
            <FunnyEvent value={'airball'} onFunnyEventClick={() => playSong('airball')}/>
          </div>
        </div>
      </div>
    </>
  );
}
