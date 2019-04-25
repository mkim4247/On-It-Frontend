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

export const setBoard = board => {
  return { type: "SET_BOARD", board }
}

export const addingUserBoard = (newBoard) => {
  return (dispatch, getStore) => {
    let user = getStore().user
    newBoard.user_id = user.id

    fetch(RAILS_API + 'user_boards', {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(newBoard)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(addUserBoard(data.user_board))
    })
  }
}

const addUserBoard = user_board => {
  return { type: "ADD_USER_BOARD", user_board }
}

export const deletingUserBoard = (user_board) => {
  return (dispatch, getStore) => {
    let user = getStore().user

    fetch(RAILS_API + `user_boards/${user_board.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(allUserBoards => {
      console.log(allUserBoards)
      let filteredBoards = allUserBoards.filter( user_board => user_board.user_id === user.id )
      dispatch(deleteUserBoard(filteredBoards))
    })
  }
}

const deleteUserBoard = (user_boards) => {
  return { type: "DELETE_USER_BOARD", user_boards }
}

export const addingUserProject = (newProject) => {
  return (dispatch, getStore) => {
    let board = getStore().board
    newProject.user_board_id = board.id

    fetch(RAILS_API + 'user_projects', {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(newProject)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(addUserProject(data.user_project, board))
    })
  }
}

const addUserProject = (user_project, board) => {
  return { type: "ADD_USER_PROJECT", user_project, board }
}

export const deletingUserProject = user_project => {
  return (dispatch, getStore) => {
    let board = getStore().board

    fetch(RAILS_API + `user_projects/${user_project.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(allUserProjects => {
        let filteredProjects = allUserProjects.filter( user_project => user_project.user_board_id === board.id )
        console.log(filteredProjects)
        dispatch(deleteUserProject(filteredProjects, board))
    })
  }
}

const deleteUserProject = (user_projects, board) => {
  return { type: "DELETE_USER_PROJECT", user_projects, board }
}


export const addingUserTodo = (todo, project) => {
  return (dispatch, getStore) => {
    fetch(RAILS_API + 'user_todos', {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(todo)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(addUserTodo(data.user_todo, project))
    })
  }
}

const addUserTodo = (user_todo, project) => {
  return { type: "ADD_USER_TODO", user_todo, project }
}


export const deletingUserTodo = (user_todo, project) => {
  return (dispatch, getStore) => {
    fetch(RAILS_API + `user_todos/${user_todo.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(allUserTodos => {
        let filteredTodos = allUserTodos.filter( user_todo => user_todo.user_project_id === project.id )
        console.log(filteredTodos)
        dispatch(deleteUserTodo(filteredTodos, project))
    })
  }
}

const deleteUserTodo = (user_todos, project) => {
  return { type: "DELETE_USER_TODO", user_todos, project }
}


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

export const addingTeamBoard = (newTeamBoard) => {
  return (dispatch, getStore) => {
    fetch(RAILS_API + 'team_boards', {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(newTeamBoard)
    })
    .then(res => res.json())
    .then(data => {
      dispatch(addTeamBoard(data.team_board))
    })
  }
}

const addTeamBoard = team_board => {
  return { type: "ADD_TEAM_BOARD", team_board }
}

export const deletingTeamBoard = (team_board, team) => {
  return (dispatch, getStore) => {

    fetch(RAILS_API + `team_boards/${team_board.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(allTeamBoards => {
      let filteredBoards = allTeamBoards.filter( board => board.team_id === team_board.team_id )
      dispatch(deleteTeamBoard(filteredBoards, team))
    })
  }
}

const deleteTeamBoard = (team_boards, team) => {
  return { type: "DELETE_TEAM_BOARD", team_boards, team }
}
