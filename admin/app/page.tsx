"use client";
import { useRef, useState } from 'react'
import {Howl, Howler} from 'howler';
import Countdown from 'react-countdown';
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'
import PhotoAlbum from "react-photo-album";
import photos from "./photos";

type ScoreProps = {
  value: number;
};

type AddPointsProps = {
  classes: string;
  inc: number;
  onClick: () => void;
}

type CommonProps = {
  classes: string;
  value: string;
  onClick: () => void;
}

const Score: React.FC<ScoreProps> = ({ value }) => {
  return <p className="score text-center">{value}</p>;
}

const AddPoints: React.FC<AddPointsProps> = ({ classes, inc, onClick }) => {
  return <button className={classes} onClick={onClick}>{inc}pts</button>;
}

const FunnyEvent: React.FC<CommonProps> = ({ classes, value, onClick }) => {
  return <button className={classes} onClick={onClick}>{value}</button>;
}

const MuteUnmute: React.FC<CommonProps> = ({ classes, value, onClick }) => {
  return <button className={classes} onClick={onClick}>{value}</button>;
}

export default function Scoreboard() {
  const [scoreBlue, setScoreBlue] = useState(0);
  const [scoreRed, setScoreRed] = useState(0);
  const officialEndDatetime = Date.UTC(2024, 5, 8, 17, 0, 0); // (months 0 based)

  const [isMuted, setIsMuted] = useState(false);
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

  function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }

  function playSong(song: string, random: boolean = false) {    
    if (random) {
      song+='-'+getRandomInt(2)
    }
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
          <div className="row">
            <PhotoAlbum layout="rows" photos={photos} spacing={5} targetRowHeight={150} />
          </div>
          <div className="row controls">
            <div className="btn-group" role="group">
              <FunnyEvent classes={'btn btn-outline-primary'} value={'airball'} onClick={() => playSong('airball')} />
              <FunnyEvent classes={'btn btn-outline-primary'} value={'cross-over'} onClick={() => playSong('cross-over')} />
              <FunnyEvent classes={'btn btn-outline-primary'} value={'🇺🇸'} onClick={() => playSong('usa', true)} />
              <MuteUnmute classes={'btn btn-outline-primary'} value="🔇" onClick={toggleSound} />
            </div>
          </div>
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
