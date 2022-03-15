import React, { useReducer } from 'react'
import playerContext from './playerContext'
import playerReducer from './playerReducer'
import { song_list } from './songs'

import {
  SET_CURRENT_SONG,
  TOGGLE_RANDOM,
  TOGGLE_REPEAT,
  TOGGLE_PLAYING,
  SET_SONGS_ARRAY,
} from './types'

const PlayerState = (props) => {
  const initialState = {
    currentSong: 0,
    songslist: song_list,
    repeat: false,
    random: false,
    playing: false,
    audio: null,
  }
  const [state, dispatch] = useReducer(playerReducer, initialState)

  // Set songs array
  const songsSet = (songArr) =>
    dispatch({ type: SET_SONGS_ARRAY, data: songArr })
  // Set playing state
  const togglePlaying = () =>
    dispatch({ type: TOGGLE_PLAYING, data: state.playing ? false : true })
  // Set current song
  const SetCurrent = (id) => dispatch({ type: SET_CURRENT_SONG, data: id })

  const prevSong = () => {
    if(state.currentSong === 0) {
      SetCurrent(state.songs.length -1)
    } else {
        SetCurrent(state.currentSong -1)
    }
  }
  const nextSong = () => {
    if(state.currentSong === 0 ) {
      SetCurrent(1)
    } else {
      SetCurrent(state.currentSong + 1)
    }
  }

  const toggleRepeat = (state) =>
    dispatch({ type: TOGGLE_REPEAT, data: state.repeat ? false : true })
  const toggleRandom = (state) =>
    dispatch({ type: TOGGLE_RANDOM, data: state.random ? false : true })

  // End of Song
  const handleEnd = () => {
    // Check for random and repeat options
    if (state.random) {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * state.currentSong.length)
      } while (newIndex === state.currentSong);
    } else {
      if (state.repeat) {
        SetCurrent(0)
      } else {
        nextSong()
      }
    }
  }

  return (
    <playerContext.Provider
      value={{
        currentSong: state.currentSong,
        songs: state.songs,
        songslist: state.songslist,
        repeat: state.repeat,
        random: state.random,
        playing: state.playing,
        audio: state.audio,
        nextSong,
        prevSong,
        SetCurrent,
        toggleRandom,
        toggleRepeat,
        togglePlaying,
        handleEnd,
        songsSet,
      }}
    >
      {props.children}
    </playerContext.Provider>
  )
}

export default PlayerState
