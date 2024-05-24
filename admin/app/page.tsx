"use client";
import { useRef } from 'react'
import {Howl, Howler} from 'howler';
import Countdown from 'react-countdown';
import { useState, useEffect } from "react";
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'

type ScoreProps = {
  value: number;
};

type AddPointsProps = {
  classes: string;
  inc: number;
  onClick: () => void;
}

type FunnyEventsProps = {
  classes: string;
  value: string;
  onClick: () => void;
}

type CommonProps = {
  value: string;
  onClick: () => void;
}

const Score: React.FC<ScoreProps> = ({ value }) => {
  return <p className="score text-center">{value}</p>;
}

const AddPoints: React.FC<AddPointsProps> = ({ classes, inc, onClick }) => {
  return <button className={classes} onClick={onClick}>{inc}pts</button>;
}

const FunnyEvent: React.FC<FunnyEventsProps> = ({ classes, value, onClick }) => {
  return <button className={classes} onClick={onClick}>{value}</button>;
}

const StartCountdown: React.FC<CommonProps> = ({ value, onClick }) => {
  return <button className="btn btn-success" onClick={onClick}>{value}</button>;
}

const ResetCountdown: React.FC<CommonProps> = ({ value, onClick }) => {
  return <button className="btn btn-warning" onClick={onClick}>{value}</button>;
}

const MuteUnmute: React.FC<CommonProps> = ({ value, onClick }) => {
  return <button className="btn btn-primary" onClick={onClick}>{value}</button>;
}

export default function Scoreboard() {
  const [scoreBlue, setScoreBlue] = useState(0);
  const [scoreRed, setScoreRed] = useState(0);
  const officialEndDatetime = Date.UTC(2024, 5, 8, 17, 0, 0); // (months 0 based)

  const initialTimerState = {hours: "00", minutes: "00", seconds: "00"};
  const [timer, setTimer] = useState(initialTimerState);
  const [isMuted, setIsMuted] = useState(false);
  const [timerId, setTimerId] = useState<number | any>(0);
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

  function incScore(inc: number, score: number, setScore: any): void {
    setScore(Math.max(0, score + inc));
  }

  function toggleSound() {
    setIsMuted(!isMuted);
    if (!isMuted) {
      Howler.volume(0);
    } else { 
      Howler.volume(1);
    }
  }

  function playSong(song: string) {
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

  return (
    <>
      <div className="container-fluid h-100 diagonal-split-background">
        <div className="row time">
          <Countdown date={officialEndDatetime} daysInHours={true} />
        </div>
        <div className="row h-100">
          <div className="col bk-black">
            <Score value={scoreBlue} />
            <div className="row controls">
              <div className="btn-group" role="group">
                <AddPoints classes={'btn btn-outline-success'} inc={+2} onClick={() => { incScore(2, scoreBlue, setScoreBlue) ; playSong('coin-mario') } } />
                <AddPoints classes={'btn btn-outline-success'} inc={+3} onClick={() => { incScore(3, scoreBlue, setScoreBlue) ; playSong('coin-mario') } } />
              </div>
              <div className="btn-group" role="group">
                <AddPoints classes={'btn btn-outline-danger'} inc={-2} onClick={() => { incScore(-2, scoreBlue, setScoreBlue) } } />
                <AddPoints classes={'btn btn-outline-danger'} inc={-3} onClick={() => { incScore(-3, scoreBlue, setScoreBlue) } } />
              </div>
            </div>
          </div>
          <div className="col bk-white">
            <Score value={scoreRed} />
            <div className="row controls">
              <div className="btn-group" role="group">
                <AddPoints classes={'btn btn-outline-success'} inc={+2} onClick={() => { incScore(2, scoreRed, setScoreRed) ; playSong('coin-mario') } } />
                <AddPoints classes={'btn btn-outline-success'} inc={+3} onClick={() => { incScore(3, scoreRed, setScoreRed) ; playSong('coin-mario') } } />
              </div>
              <div className="btn-group" role="group">
                <AddPoints classes={'btn btn-outline-danger'} inc={-2} onClick={() => { incScore(-2, scoreRed, setScoreRed) } } />
                <AddPoints classes={'btn btn-outline-danger'} inc={-3} onClick={() => { incScore(-3, scoreRed, setScoreRed) } } />
              </div>
            </div>            
          </div>
        </div>
        <div className="btn-group" role="group">
          <FunnyEvent classes={'btn btn-outline-primary'}  value={'airball'} onClick={() => playSong('airball')} />
          <FunnyEvent classes={'btn btn-outline-primary'}  value={'cross-over'} onClick={() => playSong('cross-over')} />
          <FunnyEvent classes={'btn btn-outline-primary'}  value={'🇺🇸'} onClick={() => playSong('cross-over')} />
        </div>
        <div className="btn-group admin-controls">
          <MuteUnmute value="🔇" onClick={toggleSound} />
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
