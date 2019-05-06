import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Header, Button } from 'semantic-ui-react'
import { setTeamForShowPage, deletingTeam } from '../../redux/teamActions'
import TeamBoardContainer from './TeamBoardContainer'
import TeamHeader from './TeamHeader'
import EditTeam from './EditTeam'
import Nav from '../Nav'
import Sidebar from '../SideBar'
import MembersList from './MembersList'

class TeamShow extends React.Component {

  state = {
    redirect: false
  }

  setTeamFromParams = () => {
    if(this.props.user){
      let team = this.props.user.teams.find( team => (team.name === this.props.match.params.team) && (team.id === parseInt(this.props.match.params.team_id)) )

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
        <Redirect to='/boards'/>
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
                      exact path={`/team/:team/:team_id/edit`}
                      render={ () => (
                        <EditTeam team={this.props.team}/>
                    )}/>
                  </Switch>
                </div>
                : null
              }
            </div>
            <MembersList team={this.props.team}/>
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
