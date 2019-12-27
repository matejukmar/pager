import * as React from 'react'
import { StyleSheet } from '../StyleSheet'
import MenuItem from './MenuItem'

const menu = [
  {
    title: 'Hello',
    url: '/index.html'
  },
  {
    title: 'Mars',
    url: '/hello-mars.html'
  },
  {
    title: 'Pluto',
    url: '/sub/hello-pluto.html'
  }
]

export default function Menu() {
  return <div style={styles.header}>
    <h1 style={styles.title}>Multipage React App</h1>
    <div style={styles.spacer}></div>
    <ul style={styles.menu}>
      {menu.map((menuItem, index) => {
        return <li key={index}>
          <MenuItem
            href={menuItem.url}
          >
            {menuItem.title}
          </MenuItem>
        </li>
      })}
    </ul>
  </div>
}

const styles: StyleSheet = {
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1200,
    height: 80
  },
  title: {
    color: '#000',
    fontSize: '125%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    whiteSpace: 'nowrap'
  },
  spacer: {
    flex: 1
  },
  menu: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#666'
  }
}