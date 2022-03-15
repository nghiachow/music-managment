import React from 'react'
import Playlist from '../playlist/Playlist'
import Actions from '../playlist/Actions'
import Controls from '../Controls'

import PlayerState from '../../context/PlayerState'

import '../../stlye/input.css'
import '../../stlye/main.css'

const close = () => {
  console.log('Closing the app')
}

function AudioPlayer() {
  return (
    <PlayerState>
      <div className="main">
        <div className="top">
          {/* <div className="left">
          </div> */}
          <Actions />
          <Playlist />
        </div>
        <Controls />
      </div>
    </PlayerState>
  )
}

export default AudioPlayer
