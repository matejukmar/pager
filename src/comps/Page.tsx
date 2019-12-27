import * as React from 'react'
import Menu from './Menu/Menu'
import { StyleSheet } from './StyleSheet'
import '../styles/index.css'

interface Props {
  children: JSX.Element | JSX.Element[] | null
}

export default function Page(props: Props) {
  return <div style={styles.page}>
    <Menu />
    {props.children}
  </div>
}

const styles: StyleSheet = {
  page: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
}