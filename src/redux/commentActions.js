// const RAILS_API = 'http://localhost:4247/api/v1/'
const HEROKU_API = 'https://on-it-backend.herokuapp.com/api/v1'
const HEADERS = { "Content-type": "application/json", "Accept": "application/json" }

/* passing in project that comment belongs to, similar to todo; project has type attr of user or team again */
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
    fetch(`${HEROKU_API}${project.type}_comments`, {
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
    fetch(`${HEROKU_API}${project.type}_comments/${comment.id}`, {
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
