import React from 'react';
import * as AiIcons from 'react-icons/ai'
import * as MdIcons from 'react-icons/md'

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    },
    {
        title: 'Add song',
        path: '/add',
        icon: <MdIcons.MdMusicNote />,
        className: 'nav-text'
    },
]