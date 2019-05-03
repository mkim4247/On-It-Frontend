import React from 'react'
import { connect } from 'react-redux'
import { setTeamForShowPage } from '../redux/actions'
import Nav from './Nav'
import Sidebar from './SideBar'
import BoardCard from './BoardCard'
import UsersList from './UsersList'
import EmptyBoardCard from './EmptyBoardCard'
import { Header, Icon, Segment, Item } from 'semantic-ui-react'

class TeamShow extends React.Component {

  setTeamFromParams = () => {
    if(this.props.user){
      let team = this.props.user.teams.find( team => team.name === this.props.match.params.team )

      if(team){
        this.props.setTeamForShowPage(team)
      }
    }
  }

  componentDidMount(){
    this.setTeamFromParams()
  }

  componentDidUpdate(){
    this.setTeamFromParams()
  }

  render(){
    return(
      <div>
        <Nav />
        <div className='home'>
          <Sidebar ownProps={this.props}/>
          <div className='home-board-container'>
            {this.props.team ?
              <div>
                <Header as='h1' icon textAlign='center'>
                  <Icon name='users' circular/>
                  {this.props.team.name}
                </Header>
                <Header sub textAlign='center'>
                  {this.props.team.description}
                </Header>
                <Segment secondary padded>
                  {this.props.team ?
                    <Item.Group link divided>
                      <Header as='h3' textAlign='center'>
                        Team Boards:
                      </Header>
                      {this.props.team.boards.map( board => (
                        <Item>
                          <Item.Image
                            size='tiny'
                            src={board.background_image}
                          />
                          <Item.Content>
                            <Item.Header>
                              {board.name}
                            </Item.Header>
                            <Item.Meta>
                              {board.description}
                            </Item.Meta>
                          </Item.Content>
                        </Item>
                      ))}
                    </Item.Group>
                    : null
                  }
                </Segment>
              </div>
              : null
            }
          </div>
          <UsersList team={this.props.team}/>
        </div>
      </div>
    )
  }
}

// <BoardCard
//   key={`board-${board.id}`}
//   owner={this.props.team}
//   board={board}
// />
// ))
// : null
// }
// <EmptyBoardCard owner={this.props.team} />
//


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    team: state.team
  }
}

export default connect(mapStateToProps, { setTeamForShowPage })(TeamShow)
