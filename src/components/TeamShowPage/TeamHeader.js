import React, { Fragment } from 'react'
import { Header, Icon } from 'semantic-ui-react'

const TeamHeader = props => {
  return(
    <Fragment>
      <Header
        as='h1'
        icon
        textAlign='center'>
        <Icon name='users' circular/>
        {props.team.name}
      </Header>
      <Header sub textAlign='center'>
        {props.team.description}
      </Header>
    </Fragment>
  )
}

export default TeamHeader
