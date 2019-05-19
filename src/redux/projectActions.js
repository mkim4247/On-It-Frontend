// const RAILS_API = 'http://localhost:4247/api/v1/'
const HEROKU_API = 'https://on-it-backend.herokuapp.com/api/v1/'
const HEADERS = { "Content-type": "application/json", "Accept": "application/json" }

/* board has type attr assigned of either team or user */
export const addingNewProject = (newProject, board) => {
  return (dispatch, getStore) => {

    if(board.type === "user"){
      newProject.user_board_id = board.id
    }
    else {
      newProject.team_board_id = board.id
    }

    fetch(`${HEROKU_API}${board.type}_projects`, {
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

/* project has type attr of either user or team */
export const deletingProject = (project) => {
  return (dispatch, getStore) => {
    let board = getStore().board

    fetch(`${HEROKU_API}${project.type}_projects/${project.id}`, {
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

export const editingProject = project => {
  return (dispatch, getStore) => {
    fetch(`${HEROKU_API}${project.type}_projects/${project.id}`, {
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
