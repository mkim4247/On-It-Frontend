import React from 'react'
import { connect } from 'react-redux'
import { setTeamForShowPage } from '../redux/actions'
import Nav from './Nav'
import Sidebar from './SideBar'
import UsersList from './UsersList'
import { Header, Icon, Button, Modal } from 'semantic-ui-react'
import { NavLink, Switch, Route } from 'react-router-dom'
import TeamBoardContainer from './TeamShowPage/TeamBoardContainer'
import TeamHeader from './TeamShowPage/TeamHeader'
import EditTeam from './TeamShowPage/EditTeam'

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
                <TeamHeader team={this.props.team}/>
                <Switch>
                  <Route
                    exact path={`${this.props.match.url}`} render={ () => (
                      <TeamBoardContainer team={this.props.team}/>
                  )}/>
                  <Route
                    exact path={`/team/:team/edit`}
                    render={ () => (
                      <EditTeam team={this.props.team}/>
                  )}/>
                </Switch>
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

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    team: state.team
  }
}

export default connect(mapStateToProps, { setTeamForShowPage })(TeamShow)
