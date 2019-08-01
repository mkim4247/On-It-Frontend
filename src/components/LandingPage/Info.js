import React from 'react'
import { Grid } from 'semantic-ui-react'
class Info extends React.Component {

  render(){
    return(
      <div id='info' className='vh100'>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            info
          </Grid.Column>
          <Grid.Column width={8}>
            pic
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
    )
  }
}

export default Info
