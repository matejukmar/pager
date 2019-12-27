import React, { useState } from 'react'
import { StyleSheet } from '../StyleSheet'
interface Props {
  children: JSX.Element | JSX.Element[] | string | null;
  href: string | null;
}

export default function MenuItem(props: Props) {
  const [isMouseOver, setIsMouseOver] = useState(false)
  return (
    <a
      style={{
        ...styles.item,
        ...(isMouseOver ? styles.itemHover : {})
      }}
      href={props.href}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {props.children}
    </a>
  )

  function onMouseOver() {
    setIsMouseOver(true)
  }

  function onMouseOut() {
    setIsMouseOver(false)
  }
}

const styles: StyleSheet = {
  item: {
    textAlign: 'center',
    padding: 16,
    textDecoration: 'none',
    color: '#666',
    fontSize: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'color .2s'
  },
  itemHover: {
    color: '#0d1694',
    transition: 'color .2s',
    cursor: 'pointer'
  }
}