import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import forestLullaby from './assets/music/forest-lullaby-110624.mp3';
import coverOne from './assets/img/cover-1.png';
import playButton from './assets/svg/Play_fill.svg';
import stopButton from './assets/svg/Stop_and_play_fill.svg';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, {pause,duration, sound}] = useSound(forestLullaby);
  const [time, setTime] = useState({
    min: '',
    sec: '',
  });
  const [currentTime, setCurrentTime] = useState({
    min: '',
    sec: ''
  });
  const [seconds, setSeconds] = useState(0);

  const handleButton = () => {
    if(isPlaying) {
      pause();
      setIsPlaying(!isPlaying);
    } else {
      play();
      setIsPlaying(!isPlaying);
    }
  }

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrentTime({
          min,
          sec
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  return (
    <>
      <main className="player-background">
        <article className="music-player">
          <aside>
            <img src={coverOne} alt="cover number 1" className='player-image'/>
          </aside>
        <header className='titles'>
          <h1 className="title">
            Lost in the City Lights
          </h1>
          <h2 className="author">
            Cosmo Sheldrake
          </h2>
        </header>
        <section className="time-player">
          <div>
            <div className="time">
              <p>
                {currentTime.min}:{currentTime.sec}
              </p>
              <p>
                {time.min - currentTime.min}:{time.sec-currentTime.sec}
              </p>
            </div>
            <input
              type="range"
              min="0"
              max={duration / 1000}
              default="0"
              value={seconds}
              className="timeline"
              onChange={(e) => {
                sound.seek([e.target.value]);
              }}
            />
          </div>
        </section>
        <footer className="control">
          <button className='prev-button'>
          <img src={stopButton} alt='stop button' className='icon'/>
          </button>
          <button className='play-button' onClick={handleButton}>  
            <img src={playButton} alt="play button" className='icon'/>
          </button>
          <button className='next-button'>
          <img src={stopButton} alt='stop button' className='icon'/>
          </button>
        </footer>
        </article>
      </main>
    </>
  )
}

export default App
