import React, { useState, useEffect, useRef, useContext } from 'react'
import playerContext from '../context/playerContext'

function Controls() {
  // Global State
  const {
    currentSong,
    nextSong,
    prevSong,
    playing,
    toggleRandom,
    togglePlaying,
    handleEnd,
    songslist,
  } = useContext(playerContext)

  const audio = useRef('audio_tag')

  // self State
  const [statevolum, setStateVolum] = useState(0.3)
  const [dur, setDur] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [repeat,setRepeat] = useState(false)
  const [random,setRandom] = useState(false)
 
  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~s
  }

  const toggleAudio = () =>
    audio.current.paused ? audio.current.play() : audio.current.pause()
  
  const handleVolume = (q) => {
    setStateVolum(q)
    audio.current.volume = q
  }

  const handleProgress = (e) => {
    let compute = (e.target.value * dur) / 100
    setCurrentTime(compute)
    audio.current.currentTime = compute
  }

  const repeatHandle = () => {
    setRepeat(prev => !prev)
  }

  const randomHandle = () => {
    setRandom(prev => !prev)
  }

  useEffect(() => {
    audio.current.volume = statevolum
    if (playing) {
      toggleAudio()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong])

  return (
    <div className="controls">
      <audio
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onCanPlay={(e) => setDur(e.target.duration)}
        onEnded={handleEnd}
        ref={audio}
        type="audio/mpeg"
        preload="true"
        src={songslist[currentSong].fileUrl}
        loop={repeat}
      />
      <div className="vlme">
        <span className="volum">
          <i className="fas fa-volume-down"></i>
        </span>
        <input
          value={Math.round(statevolum * 100)}
          type="range"
          name="volBar"
          id="volBar"
          onChange={(e) => handleVolume(e.target.value / 100)}
        />
      </div>
      <div className="musicControls">
        <span className="prev" onClick={prevSong}>
          <i className="fas fa-step-backward"></i>
        </span>

        <span style={{marginLeft:'17px'}}
          className="play"
          onClick={() => {
            togglePlaying()
            toggleAudio()
          }}
        >
          <span style={{marginLeft:'14px'}} className={!playing ? '' : 'hide'}>
            <i className="fas fa-play"></i>
          </span>
          <span style={{marginLeft:'14px'}} className={!playing ? 'hide' : ''}>
            <i className="fas fa-pause"></i>
          </span>
        </span>

        <span className="next" onClick={nextSong}>
          <i className="fas fa-step-forward"></i>
        </span>
      </div>

      <div className="progressb">
        <div className="songMeta">
          <span className="songtitle">{songslist[currentSong].title}</span>
          <span className="songartistName">
            {songslist[currentSong].artistName}
          </span>
        </div>
        <input
          onChange={handleProgress}
          value={dur ? (currentTime * 100) / dur : 0}
          type="range"
          name="progresBar"
          id="prgbar"
        />
        <span style={{color:'black'}}>
          <span className="currentT">{fmtMSS(currentTime)}</span>/
          <span className="totalT">{fmtMSS(dur)}</span>
        </span>
      </div>
      <div className="plsoptions">
        <span
          onClick= {() => randomHandle()}
          onClickCapture= {toggleRandom}
          className={random ? 'optional-active' : 'optional-btn'}
        >
          <i className="fas fa-random"></i>
        </span>
        <span
          className={repeat ? "optional-active" : "optional-btn"}
          onClick={() => repeatHandle()}
        >
          <i className="fas fa-redo-alt"></i>
        </span>
      </div>
    </div>
  )
}

export default Controls
