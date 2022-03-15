import React, { useContext, useState } from 'react'
import playerContext from '../../context/playerContext'
import { IconContext } from 'react-icons'
import {BsFillBookmarkHeartFill} from 'react-icons/bs'
import {Modal} from './modal' 
import { EditModal } from './editModal'
import { GlobalStyle } from './globalStyles'
import { Popover, Popconfirm, message } from 'antd';
import { BiTrash } from 'react-icons/bi'
import { AiFillEdit } from 'react-icons/ai'

function Playlist() {
  const { SetCurrent, currentSong, songslist } = useContext(playerContext)
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [songDetail,setSongDetail] = useState({})

  const openModal = () => {
    setShowModal(prev => !prev);
  };

  const openEditModal = () => {
    setShowEditModal(prev => !prev);
  };

  const content = (
    <div>
      <IconContext.Provider value={{ size:'27px'}}> 
        <button 
          onClick={() => openEditModal()}
          className='edit-btn' 
          style={{margin:'0 15px',boxSizing:'border-box', boxShadow:' rgb(216, 94, 13) 0 0 0 0.7px', borderRadius:'5px', color: '#d4b00d'}}
        >
          <AiFillEdit />
        </button>
          <Popconfirm
            title="Are you sure to delete this song?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
        <button className='delete-btn' 
          style={{margin:'0 15px',boxSizing:'border-box', boxShadow:'0 0 0 1px', borderRadius:'5px', color:'red'}}
        >
          <BiTrash />
        </button>
          </Popconfirm>
        </IconContext.Provider>
    </div>
  );

  function confirm(e) {
    console.log(e);
    message.success('Delete successfully!');
  }
  
  function cancel(e) {
    console.log(e);
    message.error('Failed to delete!');
  }

  return (
    <div style={{background:'#fff'}} className="playlist no_drag">
          <IconContext.Provider value={{ size:'35px'}}>
      <ul className="loi">
        {songslist.map((song, i) => (
          <li className='song-li'
            style={{display:'flex', justifyContent:'space-between', boxShadow:'rgba(42, 43, 42, 0.24) 0px 2px 0 0 '}}
          >
              <div 
                style={{display:'flex'}}
                className={'songContainer ' + (currentSong === i ? 'selected' : '')}
                key={i}
                onClick={() => {
                SetCurrent(i)
              }}>
              <div className="tmbn_song">
                <i className="fas fa-play"></i>
              </div>
              <div style={{display:'flex',flexDirection:'column', padding:'12px 0'}} className="songmeta_playlist">
                <span className="songname">{song.title}</span>
                <span className="songauthors">{song.artistName} </span>
              </div>
              </div>
              <div style={{justifyContent:'end', alignItems:'end'}} className="playlist_btns_group">
                <button 
                  className='fav_song' 
                  onClick={() => openModal()} 
                  onClickCapture={() => setSongDetail(song)}
                  style={{color: '#08c9a9',boxSizing:'border-box', padding:'0 0'}} 
                >
                  <BsFillBookmarkHeartFill />  
                </button>
              <Popover content={content} onVisibleChange={() => setSongDetail(song)}>
                <button style={{marginLeft:'6px'}} className="options_song playlist_btn"  >
                  <i style={{color:'#08c9a9', fontSize:'25.4px', zIndex:'4'}} class="fas fa-ellipsis-v fa-lg"></i>
                </button>
              </Popover>
            </div>
          </li>
        ))}
      </ul>
      <Modal showModal={showModal} setShowModal={setShowModal} song={songDetail}/>
      <EditModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} song={songDetail}/>
      <GlobalStyle/>
      </IconContext.Provider>
    </div>
  )
}

export default Playlist
