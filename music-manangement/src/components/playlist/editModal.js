import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { IconContext } from 'react-icons'
import { AiFillEdit } from 'react-icons/ai'
import { Input } from 'antd';

const Background = styled.div`
  bottom: 3%;
  left: 18%;
  width: 85%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const DetailBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px
`;

export const EditModal = ({ showEditModal, setShowEditModal, song }) => {
  const EditmodalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showEditModal ? 1 : 0,
    transform: showEditModal ? `translateY(0%)` : `translateY(+60%)`
  });

  const closeEditModal = e => {
    if (EditmodalRef.current === e.target) {
      setShowEditModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showEditModal) {
        setShowEditModal(false);
      }
    },
    [setShowEditModal, showEditModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
      {showEditModal ? (
        <Background onClick={closeEditModal} ref={EditmodalRef}>
          <animated.div style={animation}>
            <ModalWrapper showEditModal={showEditModal}>
              <ModalImg src={'https://sv7.anhsieuviet.com/2022/03/07/Screenshot-2022-03-07-161624.png'} alt='thumb' />
              <ModalContent>
                <div >
                  <h2 style={{fontWeight:'bolder'}}>Edit song detail</h2>
                </div>
                <form style={{justifyContent:'start', padding:'5px auto', margin:'10px 0'}}>
                  <span style={{marginTop:'5px', fontWeight:'bolder'}}>Song's name</span>
                  <Input style={{marginTop:'5px'}} defaultValue={song.title} />
                  <span style={{marginTop:'5px', fontWeight:'bolder'}}>Song's artistName</span>
                  <Input style={{marginTop:'5px'}} defaultValue={song.artistName} />
                  <span style={{marginTop:'5px', fontWeight:'bolder'}}>Song's albumTitle</span>
                  <Input style={{marginTop:'5px'}} defaultValue={song.albumTitle} />
                </form>
              <IconContext.Provider value={{color: '#fff', size:'20px'}}>
                <DetailBtn>
                  <button style={{margin:'10px 20px', borderRadius:'5px'}}>Edit <AiFillEdit /></button>
                </DetailBtn>
              </IconContext.Provider>
              </ModalContent>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowEditModal(prev => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
