import React, { Fragment } from 'react'
import { Header, Icon, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

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
      <Header sub textAlign='center'>
        <NavLink
          to={`/team/${props.team.name}/edit`}>
          <Button
            color='teal'>
            Edit Info
          </Button>
        </NavLink>
      </Header>
    </Fragment>
  )
}

export default TeamHeader
