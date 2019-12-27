// title: Hello, Pluto
// desc: Hello, Pluto's website
// keywords: mars, planet, dwarf planet
// author: Matej Ukmar
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Page from '../../comps/Page'

function HelloPluto() {
  return <Page>
    <img
      src={require('../../assets/images/pluto.jpg').default}
      style={{
        width: '100%'
      }}
      alt='Hello, Pluto'
    />
  </Page>
}

ReactDOM.render(<HelloPluto />, document.getElementById('root'))