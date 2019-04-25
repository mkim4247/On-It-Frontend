import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import BoardCard from './BoardCard'
import EmptyUserBoard from './EmptyUserBoard'

class UserBoardsList extends React.Component {
  render(){
    return(
      <div id='personal'>
        <Header size={'small'}>
          Personal Boards
        </Header>
        {this.props.user ?
          this.props.user.user_boards.map( user_board => {
            return(
              <BoardCard board={user_board} key={user_board.name + user_board.id}/>
            )
          })
          : null
        }
        <EmptyUserBoard />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserBoardsList)
