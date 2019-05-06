import React from 'react'
import { Header, Card } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import BoardCard from './BoardCard'
import EmptyBoardCard from './EmptyBoardCard'

const BoardsList = props => {
  return(
    <div className='board-list'>
      <Header size={'medium'}>
        {props.owner.type === 'user' ?
          'PERSONAL BOARDS'
          :
          <NavLink
            to={`/team/${props.owner.name}/${props.owner.id}`}>
            {props.owner.name}
          </NavLink>
        }
      </Header>
      <Card.Group itemsPerRow={3} style={{ marginBottom: "5px"}}>
        {props.owner.type === "user" ?
          props.owner.boards.map( user_board => (
            <BoardCard
              key={`board-${user_board.name}${user_board.id}`}
              owner={props.owner}
              board={user_board}
            />
          ))
          :
          props.owner.boards.map( team_board => (
            <BoardCard
              key={`board-${team_board.name}${team_board.id}`}
              owner={props.owner}
              board={team_board}
            />
          ))
        }
        <EmptyBoardCard owner={props.owner} />
      </Card.Group>
    </div>
  )
}

export default BoardsList
