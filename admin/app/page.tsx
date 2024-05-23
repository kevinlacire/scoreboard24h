"use client";
import { useRef } from 'react'
import {Howl, Howler} from 'howler';
import countdown from './countdown.min.js'
import { useState, useEffect } from "react";
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'

function Timer({ hours, minutes, seconds }) {
  return <span className="text-center align-middle"><span id='hours'>{hours}</span>:<span id='minutes'>{minutes}</span>:<span id='seconds'>{seconds}</span></span>;
}

function Score({ value }) {
  return <p className="score text-center">{value}</p>;
}

function AddPoints({ classes, inc, on2ptsClick}) {
  return <button className={classes} onClick={on2ptsClick}>{inc}pts</button>;
}

function FunnyEvent({ classes, value, onFunnyEventClick }) {
  return <button className={classes} onClick={onFunnyEventClick}>{value}</button>;
}

function StartCountdown({ value, onStartCountdownEventClick }) {
  return <button className="btn btn-success" onClick={onStartCountdownEventClick}>{value}</button>;
}

function ResetCountdown({ value, onResetCountdownEventClick }) {
  return <button className="btn btn-warning" onClick={onResetCountdownEventClick}>{value}</button>;
}

function MuteUnmute({ value, onMuteUnmuteEventClick }) {
  return <button className="btn btn-primary" onClick={onMuteUnmuteEventClick}>{value}</button>;
}

export default function Scoreboard() {
  const [scoreBlue, setScoreBlue] = useState(0);
  const [scoreRed, setScoreRed] = useState(0);
  const officialEndDatetime = Date.UTC(2024, 5, 8, 17, 0, 0); // (months 0 based)

  const initialTimerState = {hours: "00", minutes: "00", seconds: "00"};
  const [timer, setTimer] = useState(initialTimerState);
  const [isMuted, setIsMuted] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const [soundIsPlaying, setSoundIsPlaying] = useState(false);
  
  const firework = useRef<FireworksHandlers>(null)

  function fireworks() {
    console.log("PASS 0");
    if (!firework.current) return;
    console.log("PASS 1");
    if (firework.current.isRunning) return;
    console.log("PASS 2");
    firework.current.start();
  }

  function incScore(inc, score, setScore) {
    setScore(Math.max(0, score + inc));
  }

  function launchCountdown() {
    console.log("launch countdown");
    //console.log(Math.floor(officialLauchDatetime - baseDatetime));
    setTimerId(countdown(
      officialEndDatetime,
      function (ts) {
        setTimer({
          hours: ((ts.hours < 10) ? "0" : "") + ts.hours,
          minutes: ((ts.minutes < 10) ? "0" : "") + ts.minutes,
          seconds: ((ts.seconds < 10) ? "0" : "") + ts.seconds
        });

        if (ts.hours == 0 && ts.minutes == 0 && ts.seconds == 0) {
          window.clearInterval(timerId);
          //fireworks();
          console.log("game over");
        }
      },
      countdown.HOURS | countdown.MINUTES | countdown.SECONDS
    ));
  }

  function resetCountdown() {
    console.log("reset countdown");
    window.clearInterval(timerId);
    setTimer(initialTimerState);
  }

  function toggleSound() {
    setIsMuted(!isMuted);
    if (!isMuted) {
      Howler.volume(0);
    } else { 
      Howler.volume(1);
    }
  }

  function playSong(song) {
    console.log(song + '.mp3');
    var sound = new Howl({
      src: [song + '.mp3'],
      html5: true
    });

    if (!soundIsPlaying && !isMuted) {
      sound.play();
      setSoundIsPlaying(true);
      sound.on('end', function(){
        setSoundIsPlaying(false);
        // TODO play/stop si la musique en paramètre est la même que celle qui est en cours de lecture
      });
    }
  }

  useEffect(() => {
    launchCountdown();
  }, []);

  return (
    <>
      <div className="container-fluid h-100">
        <div className="row time">
          <Timer hours={timer.hours} minutes={timer.minutes} seconds={timer.seconds} />
        </div>
        <div className="row h-100">
          <div className="col bk-black">
            <Score value={scoreBlue} />
            <div className="row controls">
              <div className="btn-group" role="group">
                <AddPoints classes={'btn btn-outline-success'} inc={+2} on2ptsClick={() => { incScore(2, scoreBlue, setScoreBlue) ; playSong('coin-mario') } } />
                <AddPoints classes={'btn btn-outline-success'} inc={+3} on2ptsClick={() => { incScore(3, scoreBlue, setScoreBlue) ; playSong('coin-mario') } } />
              </div>
              <div className="btn-group" role="group">
                <AddPoints classes={'btn btn-outline-danger'} inc={-2} on2ptsClick={() => { incScore(-2, scoreBlue, setScoreBlue) } } />
                <AddPoints classes={'btn btn-outline-danger'} inc={-3} on2ptsClick={() => { incScore(-3, scoreBlue, setScoreBlue) } } />
              </div>
            </div>
          </div>
          <div className="col bk-white">
            <Score value={scoreRed} />
            <div className="row controls">
              <div className="btn-group" role="group">
                <AddPoints classes={'btn btn-outline-success'} inc={+2} on2ptsClick={() => { incScore(2, scoreRed, setScoreRed) ; playSong('coin-mario') } } />
                <AddPoints classes={'btn btn-outline-success'} inc={+3} on2ptsClick={() => { incScore(3, scoreRed, setScoreRed) ; playSong('coin-mario') } } />
              </div>
              <div className="btn-group" role="group">
                <AddPoints classes={'btn btn-outline-danger'} inc={-2} on2ptsClick={() => { incScore(-2, scoreRed, setScoreRed) } } />
                <AddPoints classes={'btn btn-outline-danger'} inc={-3} on2ptsClick={() => { incScore(-3, scoreRed, setScoreRed) } } />
              </div>
            </div>            
          </div>
        </div>
        <div className="btn-group" role="group">
          <FunnyEvent classes={'btn btn-outline-primary'}  value={'airball'} onFunnyEventClick={() => playSong('airball')} />
          <FunnyEvent classes={'btn btn-outline-primary'}  value={'cross-over'} onFunnyEventClick={() => playSong('cross-over')} />
          <FunnyEvent classes={'btn btn-outline-primary'}  value={'🇺🇸'} onFunnyEventClick={() => playSong('cross-over')} />
        </div>
        <div className="btn-group admin-controls">
          <StartCountdown value="▶️" onStartCountdownEventClick={launchCountdown} />
          <ResetCountdown value="🔄" onResetCountdownEventClick={resetCountdown} />
          <MuteUnmute value="🔇" onMuteUnmuteEventClick={toggleSound} />
        </div>
      </div>
      {/*<Fireworks
        ref={firework}
        options={{ opacity: 1 }}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
          background: 'transparent'
        }}
      />*/}
    </>
  );
}
