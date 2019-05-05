import React, { Fragment } from 'react'
import { Header, Icon } from 'semantic-ui-react'

const UserHeader = props => {
  return(
    <Fragment>
      <Header
        as='h1'
        icon
        textAlign='center'>
        <Icon name='users' circular/>
        {`${props.user.first_name} ${props.user.last_name}`}
      </Header>
    </Fragment>
  )
}

export default UserHeader
