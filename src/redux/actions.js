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
      let filteredBoards = allUserBoards.filter( user_board => user_board.user_id === user.id )
      dispatch(deleteUserBoard(filteredBoards))
    })
  }
}

const deleteUserBoard = (user_board) => {
  return { type: "DELETE_USER_BOARD", user_board }
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
