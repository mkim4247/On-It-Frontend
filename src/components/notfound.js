import React, { Fragment } from 'react'
import { Header } from 'semantic-ui-react'
import Nav from './Nav'

const NotFound = props => {
  return (
    <div>
      <Nav />
      <div className='home'>
        <div className='board-list'>
          <Header as='h1' textAlign='center' verticalAlign='center'>
            Sorry, this page does not exist.
          </Header>
        </div>
      </div>
    </div>
  )
}

export default NotFound
