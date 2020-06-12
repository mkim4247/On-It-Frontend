import React, { Fragment } from 'react'
import { Header, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types';

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

CalendarContainer.defaultProps = {
  reservations: [{start: '', end:'', title: ''}]
}

CalendarContainer.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func
}
