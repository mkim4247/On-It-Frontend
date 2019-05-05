import React from 'react'
import { Item } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const TeamBoardCard = props => {
  return(
    <Item key={`team-${props.board.id}`}>
      <Item.Image
        size='tiny'
        src={props.board.background_image}
      />
      <Item.Content>
        <Item.Header
          as={NavLink}
          to={`/team/${props.team.name}/${props.team.id}/boards/${props.board.name}/${props.board.id}`}>
          {props.board.name}
        </Item.Header>
        <Item.Meta>
          {props.board.description}
        </Item.Meta>
      </Item.Content>
    </Item>
  )
}

export default TeamBoardCard
