import React from 'react'
import { Header, Item, Segment } from 'semantic-ui-react'
import AddBoard from './AddBoard'
import TeamBoardCard from './TeamBoardCard'

const TeamBoardContainer = props => {
  return(
    <Segment secondary padded>
      {props.team ?
        <Item.Group divided>
          <Header as='h3' textAlign='center'>
            Team Boards:
          </Header>
          {props.team.boards.map( board => (
            <TeamBoardCard
              key={`tbc-${board.id}`}
              board={board}
              team={props.team} />
          ))}
          <Item>
            <Item.Content>
              <AddBoard owner={ {...props.team, type: "team"} }/>
            </Item.Content>
          </Item>
        </Item.Group>
        : null
      }
    </Segment>
  )
}

export default TeamBoardContainer
