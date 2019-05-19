import { setUser } from './userActions'

// const RAILS_API = 'http://localhost:4247/api/v1/'
const HEROKU_API = 'https://on-it-backend.herokuapp.com/api/v1/'
const HEADERS = { "Content-type": "application/json", "Accept": "application/json" }

/* will be getting project that todo belongs to, which has type attr of user or team again */
export const addingNewTodo = (newTodo, project) => {
  return (dispatch, getStore) => {

    newTodo[`${project.type}_project_id`] = project.id

    fetch(`${HEROKU_API}${project.type}_todos`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(newTodo)
    })
    .then(res => res.json())
    .then(data => {
      if(project.type === "user"){
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
    fetch(`${HEROKU_API}${project.type}_todos/${todo.id}`, {
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


export const editingTodo = (todo, project) => {
  return dispatch => {
    fetch(`${HEROKU_API}${project.type}_todos/${todo.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(todo)
    })
    .then(res => res.json())
    .then(editTodo => {
      if(project.type === "user")
        dispatch(editUserTodo(editTodo, project))
      else {
        dispatch(editTeamTodo(editTodo, project))
      }
    })
  }
}

const editUserTodo = (todo, project) => {
  return { type: "EDIT_USER_TODO", todo, project }
}

const editTeamTodo = (todo, project) => {
  return { type: "EDIT_TEAM_TODO", todo, project }
}


/* used for hopping on/assigning self to a todo; creates new User_team_todo join instance */
export const assigningUserTeamTodo = (todo, project) => {
  return (dispatch, getStore) => {
    let user = getStore().user

    let newUserTeamTodo = {
      user_id: user.id,
      team_todo_id: todo.id
    }

    fetch(`${HEROKU_API}user_team_todos`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(newUserTeamTodo)
    })
    .then(res => res.json())
    .then(newTodo => {
      dispatch(addUserTeamTodo(newTodo, project))
    })
  }
}

const addUserTeamTodo = (todo, project) => {
  return { type: "ADD_USER_TEAM_TODO", todo, project }
}

/* making delete fetch with params to help find correct User_team_todo join instance to delete; return from controller is the user obj */
export const unassigningUserTeamTodo = (todo) => {
  return (dispatch, getStore) => {
    let user = getStore().user

    let user_team_todo = {
      user_id: user.id,
      team_todo_id: todo.id
    }

    fetch(`${HEROKU_API}user_team_todos`, {
      method: "DELETE",
      headers: HEADERS,
      body: JSON.stringify(user_team_todo)
    })
    .then(res => res.json())
    .then(user => {
      dispatch(setUser(user))
    })
  }
}

export const reorganizingTodos = (todo, project) => {
  return dispatch => {
    fetch(`${HEROKU_API}${project.type}_todos/${todo.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(todo)
    })
    .then(res => res.json())
    .then(editTodo => {
      if(project.type === "user")
        dispatch(editUserTodo(editTodo, project))
      else {
        dispatch(editTeamTodo(editTodo, project))
      }
    })
  }
}
