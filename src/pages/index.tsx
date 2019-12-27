// title: Hello, World
// desc: Hello World's website
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Page from '../comps/Page'

function Home() {
  return <Page>
    <img
      src={require('../assets/images/hello.jpg').default}
      style={{
        width: '100%'
      }}
      alt='Hello, World'
    />
  </Page>
}

ReactDOM.render(<Home />, document.getElementById('root'))