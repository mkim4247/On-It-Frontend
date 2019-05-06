import { setUser } from './userActions'

const RAILS_API = 'http://localhost:4247/api/v1/'
const HEADERS = { "Content-type": "application/json" }

/* used for setting team from params */
export const setTeamForShowPage = team => {
  return { type: "SET_TEAM", team }
}

/* sending User id attached to team in fetch to create User_team join instance on backend at same time */
export const addingNewTeam = (newTeam) => {
  return (dispatch, getStore) => {
    let user = getStore().user
    newTeam.user_id = user.id

    fetch(RAILS_API + 'teams', {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(newTeam)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(addNewTeam(data.team))
    })
  }
}

export const addNewTeam = (team) => {
  return { type: "ADD_NEW_TEAM", team }
}

export const deletingTeam = (team) => {
  return (dispatch, getStore) => {
    let user = getStore().user

    fetch(RAILS_API + `teams/${team.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(allTeams => {
      /* controller currently returns all teams, so need to filter for appropriate ones and then assign */
      let filteredTeams = allTeams.filter( team => team.users.find(userObj => userObj.username === user.username) )
      dispatch(deleteTeam(filteredTeams))
    })
  }
}

const deleteTeam = teams => {
  return { type: "DELETE_TEAM", teams }
}

export const editingTeam = team => {
  return (dispatch, getStore) => {
    fetch(`${RAILS_API}teams/${team.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(team)
    })
    .then(res => res.json())
    .then(newTeam => {
      dispatch(editTeam(newTeam))
    })
  }
}

const editTeam = team => {
  return { type: "EDIT_TEAM", team }
}

/* look at all the users and see if any of them have the matching email on the invite or is already on the team; only send fetch to create new invite if conditions match */
export const invitingToTeam = (newInvite, team) => {
  return (dispatch, getStore) => {
    let user = getStore().user

    fetch(`${RAILS_API}users`)
    .then(res => res.json())
    .then(users => {
      let receiver = users.find( user => user.email === newInvite.email)

      if(team.users.find(user => user.email === newInvite.email)){
        alert("That member already exists on this team")
      }
      else {
        if(receiver){
          newInvite.sender_id = user.id
          newInvite.receiver_id = receiver.id
          newInvite.team_id = team.id

          fetch(`${RAILS_API}invites`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(newInvite)
          })
          .then(res => res.json())
          .then(data => {
            alert("Invite Sent!")
            console.log(data)
          })
        }
        else {
          alert("That user does not exist. Please enter a valid email")
        }
      }
    })
  }
}

/* accepting invite will create new User_Team join instance and delete the invite instance */
export const acceptingTeamInvite = invite => {
  return (dispatch, getStore) => {
    let user = getStore().user
    let newUserTeam = {user_id: user.id, team_id: invite.team.id}

    fetch(`${RAILS_API}user_teams`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(newUserTeam)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(joinTeam(data.team))
      dispatch(deletingTeamInvite(invite))
    })
  }
}

const joinTeam = team => {
  return { type: "JOINING_TEAM", team }
}

/* called if user accepts or declines invite */
export const deletingTeamInvite = invite => {
  return (dispatch, getStore) => {
    let user = getStore().user

    fetch(`${RAILS_API}invites/${invite.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(allInvites => {
      let filteredInvites = allInvites.filter( invite => invite.receiver.username === user.username )
      dispatch(deleteTeamInvite(filteredInvites))
    })
  }
}

const deleteTeamInvite = invites => {
  return { type: "DELETE_TEAM_INVITE", invites }
}

/* destroys the User_Team join instance; sending params so we can lookup the right instance in the backend for deleting */
export const leavingTeam = team => {
  return (dispatch, getStore) => {
    let user = getStore().user

    let user_team = {
      team_id: team.id,
      user_id: user.id
    }
    fetch(`${RAILS_API}user_teams`, {
      method: "DELETE",
      headers: HEADERS,
      body: JSON.stringify(user_team)
    })
    .then(res => res.json())
    .then(user => {
      dispatch(setUser(user))
    })
  }
}
