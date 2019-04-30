const RAILS_API = 'http://localhost:4247/api/v1/'
const HEADERS = { "Content-type": "application/json" }

/* USER RELATED ACTIONS*/
export const setUser = user => {
  return { type: "SET_USER", user }
}

export const settingUser = user => {
  return dispatch => {
    fetch(RAILS_API + 'login', {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        alert('Incorrect username and/or password')
      }
      else{
        console.log('Login Successful', data.user_info)
        dispatch(setUser(data.user_info))
        localStorage.setItem('token', data.token)
      }
    })
  }
}

// export const creatingNewUser = user => {
//   return dispatch => {
//     fetch(RAILS_API + 'users', {
//       method:"POST",
//       headers: HEADERS,
//       body: JSON.stringify({ user })
//     })
//     .then(res => res.json())
//     .then(data => {
//       if(data.error){
//         alert(data.error)
//       }
//       else {
//         console.log('New User Created')
//         dispatch(setUser(data.user))
//         localStorage.setItem('token', data.token)
//       }
//     })
//   }
// }

export const checkingToken = token => {
  return dispatch => {
    fetch(RAILS_API + 'profile', {
    method: "GET",
    headers: {
      "Authentication": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(user => {
      if(user.error){
        alert('Invalid Token')
        localStorage.clear()
      }
      else {
        console.log(`Welcome Back, ${user.username}`, user)
        dispatch(setUser(user))
      }
    })
  }
}

////////////////////////////////////////

export const setBoardForShowPage = board => {
  return { type: "SET_BOARD", board }
}

export const addingNewBoard = (newBoard, owner) => {
  return (dispatch, getStore) => {
    if(owner.type === "user"){
      newBoard.user_id = owner.id
    }
    else {
      newBoard.team_id = owner.id
    }

    fetch(`${RAILS_API}${owner.type}_boards`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(newBoard)
    })
    .then(res => res.json())
    .then(data => {
      if(owner.type === "user") {
        dispatch(addUserBoard(data.user_board))
      }
      else {
        dispatch(addTeamBoard(data.team_board))
      }
    })
  }
}

const addUserBoard = user_board => {
  return { type: "ADD_USER_BOARD", user_board }
}

const addTeamBoard = team_board => {
  return { type: "ADD_TEAM_BOARD", team_board }
}


export const deletingBoard = (board, path) => {
  return (dispatch, getStore) => {
    let user = getStore().user

    fetch(`${RAILS_API}${path}_boards/${board.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(allBoards => {
      if(path === "user"){
        let filteredBoards = allBoards.filter( user_board => user_board.user_id === user.id )
        dispatch(deleteUserBoard(filteredBoards))
      }
      else {
        let filteredBoards = allBoards.filter( team_board => team_board.team_id === board.team_id )
        dispatch(deleteTeamBoard(filteredBoards, board.team_id))
      }
    })
  }
}


const deleteUserBoard = (user_boards) => {
  return { type: "DELETE_USER_BOARD", user_boards }
}

const deleteTeamBoard = (team_boards, teamID) => {
  return { type: "DELETE_TEAM_BOARD", team_boards, teamID }
}





export const addingNewProject = (newProject, board) => {
  return (dispatch, getStore) => {

    if(board.type === "user"){
      newProject.user_board_id = board.id
    }
    else {
      newProject.team_board_id = board.id
    }

    fetch(`${RAILS_API}${board.type}_projects`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(newProject)
    })
    .then(res => res.json())
    .then(data => {

      if(board.type === "user"){
        dispatch(addUserProject(data.project, board))
      }
      else {
        dispatch(addTeamProject(data.project, board))
      }
    })
  }
}


const addUserProject = (user_project, board) => {
  return { type: "ADD_USER_PROJECT", user_project, board }
}

const addTeamProject = (team_project, board) => {
  return { type: "ADD_TEAM_PROJECT", team_project, board }
}

export const deletingProject = (project, path) => {
  return (dispatch, getStore) => {
    let board = getStore().board

    fetch(`${RAILS_API}${path}_projects/${project.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(allProjects => {
      if(path === "user"){
        let filteredUser = allProjects.filter( user_project => user_project.user_board_id === board.id )
        dispatch(deleteUserProject(filteredUser, board))
      }
      else {
        let filteredTeam = allProjects.filter( team_project => team_project.team_board_id === board.id )
        dispatch(deleteTeamProject(filteredTeam, board))
      }
    })
  }
}

const deleteUserProject = (user_projects, board) => {
  return { type: "DELETE_USER_PROJECT", user_projects, board }
}

const deleteTeamProject = (team_projects, team_board) => {
  return { type: "DELETE_TEAM_PROJECT", team_projects, team_board }
}






export const addingNewTodo = (newTodo, project, path) => {
  return (dispatch, getStore) => {

    newTodo[`${path}_project_id`] = project.id

    fetch(`${RAILS_API}${path}_todos`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(newTodo)
    })
    .then(res => res.json())
    .then(data => {
      if(path === "user"){
        dispatch(addUserTodo(data.user_todo, project))
      }
      else {
        dispatch(addTeamTodo(data.team_todo, project))
      }
    })
  }
}

const addUserTodo = (user_todo, project) => {
  return { type: "ADD_USER_TODO", user_todo, project }
}

const addTeamTodo = (team_todo, project) => {
  return { type: "ADD_TEAM_TODO", team_todo, project }
}


export const deletingTodo = (todo, project) => {
  return (dispatch, getStore) => {
    fetch(`${RAILS_API}${project.type}_todos/${todo.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(allTodos => {
      if(project.type === "user"){
        let filteredTodos = allTodos.filter( todo => todo.user_project_id === project.id )
        dispatch(deleteUserTodo(filteredTodos, project))
      }
      else {
        let filteredTodos = allTodos.filter( todo => todo.team_project_id === project.id )
        dispatch(deleteTeamTodo(filteredTodos, project))
      }

    })
  }
}

const deleteUserTodo = (user_todos, project) => {
  return { type: "DELETE_USER_TODO", user_todos, project }
}
const deleteTeamTodo = (team_todos, project) => {
  return { type: "DELETE_TEAM_TODO", team_todos, project }
}


///////////////////

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
      let filteredTeams = allTeams.filter( team => team.users.find(userObj => userObj.username === user.username) )
      dispatch(deleteTeam(filteredTeams))
    })
  }
}

const deleteTeam = teams => {
  return { type: "DELETE_TEAM", teams }
}


/////////////////////////

export const invitingToTeam = (newInvite, team) => {
  return (dispatch, getStore) => {
    let user = getStore().user

    fetch(`${RAILS_API}users`)
    .then(res => res.json())
    .then(users => {
      let receiver = users.find( user => user.email === newInvite.email)

      if(team.users.find(user => user.email === receiver.email)){
        alert("Already a member")
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
            console.log(data)
          })
        }
        else {
          alert("That user does not exist")
        }
      }
    })
  }
}

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
      console.log(data)
      dispatch(deletingTeamInvite(invite))
    })
  }
}

export const deletingTeamInvite = invite => {
  return (dispatch, getStore) => {
    fetch(`${RAILS_API}invites/${invite.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  }
}



///////

export const postingNewComment = (comment, project) => {
  return (dispatch, getStore) => {
    let user = getStore().user
    comment.user_id = user.id

    if(project.type === "user"){
      comment.user_project_id = project.id
    }
    else {
      comment.team_project_id = project.id
    }
    fetch(`${RAILS_API}${project.type}_comments`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(comment)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  }
}

export const deletingComment = (comment, project) => {
  return (dispatch, getStore) => {
    fetch(`${RAILS_API}${project.type}_comments/${comment.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  }
}
