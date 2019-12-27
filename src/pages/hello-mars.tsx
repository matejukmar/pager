// title: Hello, Mars
// desc: Hello, Mars's website
// keywords: mars, planet, red
// author: Matej Ukmar
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Page from '../comps/Page'

function HelloMars() {
  return <Page>
    <img
      src={require('../assets/images/mars.jpg').default}
      style={{
        width: '100%'
      }}
      alt='Hello, Pluto'
    />
  </Page>
}

ReactDOM.render(<HelloMars />, document.getElementById('root'))