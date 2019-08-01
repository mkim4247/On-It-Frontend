import React from 'react'
import { Header, Button, Segment } from 'semantic-ui-react'

class Hero extends React.Component {

  render(){
    return(
      <div id='hero' className='vh100'>
        <div id='hero-container'>
          <Header size='large'>
            this is just a bunch of filler text to take up space
          </Header>

          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>

          <Button
            color='teal'>
            click
          </Button>
        </div>
      </div>
    )
  }
}

export default Hero
