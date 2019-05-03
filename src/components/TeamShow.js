import React from 'react'
import { connect } from 'react-redux'
import { setTeamForShowPage, deletingTeam } from '../redux/actions'
import Nav from './Nav'
import Sidebar from './SideBar'
import UsersList from './UsersList'
import { Header, Button } from 'semantic-ui-react'
import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
import TeamBoardContainer from './TeamShowPage/TeamBoardContainer'
import TeamHeader from './TeamShowPage/TeamHeader'
import EditTeam from './TeamShowPage/EditTeam'

class TeamShow extends React.Component {
  state = {
    redirect: false
  }
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

  handleDeleteTeam = event => {
    let confirm = window.confirm("Are you sure you want to delete this team?")

    let owner = {...this.props.team, type: "team"}

    if(confirm){
      this.props.deletingTeam(owner)
      this.setState({
        redirect: true
      })
    }
  }

  render(){
    return(
      this.state.redirect ?
        <Redirect to='/home'/>
        :
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
                        <TeamBoardContainer
                          team={this.props.team}/>
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
            <Header sub textAlign='center'>
              <Button
                color='red'
                onClick={this.handleDeleteTeam}>
                Delete Team
              </Button>
            </Header>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    team: state.team,
  }
}

export default connect(mapStateToProps, { setTeamForShowPage, deletingTeam })(TeamShow)