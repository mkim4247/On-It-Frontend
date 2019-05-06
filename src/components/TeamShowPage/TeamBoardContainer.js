import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Header, Item, Segment, Button } from 'semantic-ui-react'
import AddBoard from './AddBoard'
import TeamBoardCard from './TeamBoardCard'

const TeamBoardContainer = props => {
  return(
    <Fragment>
      <Header sub textAlign='center'>
        <NavLink
          to={`/team/${props.team.name}/${props.team.id}/edit`}>
          <Button
            color='teal'>
            Edit Info
          </Button>
        </NavLink>
      </Header>
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
    </Fragment>
  )
}

export default TeamBoardContainer
