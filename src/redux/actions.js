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

export const creatingNewUser = user => {
  return dispatch => {
    fetch(RAILS_API + 'users', {
      method:"POST",
      headers: HEADERS,
      body: JSON.stringify({ user })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        alert(data.error)
      }
      else {
        console.log('New User Created')
        dispatch(setUser(data.user))
        localStorage.setItem('token', data.token)
      }
    })
  }
}

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


export const editingUser = user => {
  return (dispatch, getStore) => {
    let currentUser = getStore().user

    fetch(`${RAILS_API}users/${currentUser.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({ user })
    })
    .then(res => res.json())
    .then(newUser => {
      if(newUser.errors){
        alert('Update Failed')
        console.log(newUser.errors)
      }
      else {
        console.log(`Updated`, newUser)
        dispatch(setUser(newUser))
      }
    })
  }
}

export const deletingUser = () => {
  return (dispatch, getStore) => {
    let user = getStore().user

    fetch(`${RAILS_API}users/${user.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      dispatch(setUser(null))
    })
  }
}

////////////////////////////////////////

export const setBoardForShowPage = board => {
  return { type: "SET_BOARD", board }
}

export const addingNewBoard = (newBoard, owner) => {
  if(!newBoard.background_image){
    let backgroundURLs = [
      'https://images.unsplash.com/photo-1453955994444-36bcd2f979fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1454357402858-6f7bafb65814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1418226970361-9f1f7227d638?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1428342319217-5fdaf6d7898e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1429305336325-b84ace7eba3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1428550670225-15f007f6f1ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1428976365951-b70e0fa5c551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1429041966141-44d228a42775?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1433354359170-23a4ae7338c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1428452932365-4e7e1c4b0987?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1446426156356-92b664d86b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1441906363162-903afd0d3d52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1436985487860-712a3b558087?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1449168013943-3a15804bb41c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1431492299426-2ea1ce429cc0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1432256851563-20155d0b7a39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    ]

    let randomIndex = Math.floor(Math.random() * 19)
    let randomBackground = backgroundURLs[randomIndex]
    newBoard.background_image = randomBackground
  }

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


export const deletingBoard = board => {
  return (dispatch, getStore) => {
    let user = getStore().user

    fetch(`${RAILS_API}${board.type}_boards/${board.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(allBoards => {
      if(board.type === "user"){
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
      console.log(data)
      if(board.type === "user"){
        dispatch(addUserProject(data.user_project, board))
      }
      else {
        dispatch(addTeamProject(data.team_project, board))
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

export const deletingProject = (project) => {
  return (dispatch, getStore) => {
    let board = getStore().board

    fetch(`${RAILS_API}${project.type}_projects/${project.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(allProjects => {
      if(project.type === "user"){
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






export const addingNewTodo = (newTodo, project) => {
  return (dispatch, getStore) => {

    newTodo[`${project.type}_project_id`] = project.id

    fetch(`${RAILS_API}${project.type}_todos`, {
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

export const deletingTeamInvite = invite => {
  return (dispatch, getStore) => {
    let user = getStore().user

    fetch(`${RAILS_API}invites/${invite.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(allInvites => {
      let filteredInvites = allInvites.filter( invite => invite.receiver.find(receiver => receiver.username === user.username) )
      dispatch(deleteTeamInvite(filteredInvites))
    })
  }
}

const deleteTeamInvite = invites => {
  return { type: "DELETE_TEAM_INVITE", invites }
}

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
    .then(newComment => {
      if(project.type === "user"){
        dispatch(addUserComment(newComment, project))
      }
      else {
        dispatch(addTeamComment(newComment, project))
      }
    })
  }
}

const addUserComment = (user_comment, project) => {
  return { type: "ADD_USER_COMMENT", user_comment, project }
}

const addTeamComment = (team_comment, project) => {
  return { type: "ADD_TEAM_COMMENT", team_comment, project }
}


export const deletingComment = (comment, project) => {
  return (dispatch, getStore) => {
    fetch(`${RAILS_API}${project.type}_comments/${comment.id}`, {
      method: "DELETE",
      headers: HEADERS,
      body: JSON.stringify(comment)
    })
    .then(res => res.json())
    .then(selectedComments => {
      if(project.type === "user"){
        dispatch(deletedUserComment(selectedComments, project))
      }
      else {
        dispatch(deletedTeamComment(selectedComments, project))
      }
    })
  }
}

const deletedUserComment = (user_comments, project) => {
  return { type: "DELETE_USER_COMMENT", user_comments, project }
}

const deletedTeamComment = (team_comments, project) => {
  return { type: "DELETE_TEAM_COMMENT", team_comments, project }
}


export const assigningUserTeamTodo = (todo, project) => {
  return (dispatch, getStore) => {
    let user = getStore().user

    let newUserTeamTodo = {
      user_id: user.id,
      team_todo_id: todo.id
    }

    fetch(`${RAILS_API}user_team_todos`, {
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

export const unassigningUserTeamTodo = (todo) => {
  return (dispatch, getStore) => {
    let user = getStore().user

    let user_team_todo = {
      user_id: user.id,
      team_todo_id: todo.id
    }

    fetch(`${RAILS_API}user_team_todos`, {
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


////////////////

export const setTeamForShowPage = team => {
  return { type: "SET_TEAM", team }
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

export const editingProject = project => {
  return (dispatch, getStore) => {
    fetch(`${RAILS_API}${project.type}_projects/${project.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(project)
    })
    .then(res => res.json())
    .then(editProject => {
      if(project.type === "user")
        dispatch(editUserProject(editProject))
      else {
        dispatch(editTeamProject(editProject))
      }
    })
  }
}

const editUserProject = project => {
  return { type: "EDIT_USER_PROJECT", project }
}

const editTeamProject = project => {
  return { type: "EDIT_TEAM_PROJECT", project }
}


export const editingBoard = board => {
  return dispatch => {
    fetch(`${RAILS_API}${board.type}_boards/${board.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(board)
    })
    .then(res => res.json())
    .then(editBoard => {
      if(board.type === "user")
        dispatch(editUserBoard(editBoard))
      else {
        dispatch(editTeamBoard(editBoard))
      }
    })
  }
}

const editUserBoard = board => {
  return { type: "EDIT_USER_BOARD", board }
}

const editTeamBoard = board => {
  return { type: "EDIT_TEAM_BOARD", board }
}


export const editingTodo = (todo, project) => {
  return dispatch => {
    fetch(`${RAILS_API}${project.type}_todos/${todo.id}`, {
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
