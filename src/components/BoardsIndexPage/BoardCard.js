import React from 'react'
import { NavLink } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import PropTypes from 'prop-types';

const BoardCard = props => {
  return(
    <NavLink
      to={
        props.owner.type === "user" ?
        `/user/${props.owner.username}/boards/${props.board.name}/${props.board.id}`
        :
        `/team/${props.owner.name}/${props.owner.id}/boards/${props.board.name}/${props.board.id}`}>
      <div
        style={{
          backgroundImage: `url(${props.board.background_image})`
        }}
        className='board-card'>
        <Header
          as='h1'
          textAlign='center'
          style={{
            color: 'white',
            textShadow: '1px 1px 1px black'
          }}>
          {props.board.name.length > 20 ?
            props.board.name.slice(0, 20) + '...'
            :
            props.board.name
          }
        </Header>
      </div>
    </NavLink>
  )
}

export default BoardCard


BoardCard.defaultProps = {
  reservations: [{start: '', end:'', title: ''}]
}

BoardCard.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func
}
