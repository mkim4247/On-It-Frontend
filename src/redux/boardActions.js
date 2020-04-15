import backgroundURLs from '../backgroundImageURLs'

// const RAILS_API = 'http://localhost:4247/api/v1/'
const HEROKU_API = 'https://on-it-backend.herokuapp.com/api/v1/'
const HEADERS = { "Content-type": "application/json", "Accept": "application/json" }

/* used for setting board from params */
export const setBoardForShowPage = board => {
  return { type: "SET_BOARD", board }
}

/* owner is either Team or User object with a type attr */
export const addingNewBoard = (newBoard, owner) => {

  /* assign random background image URL if user doesn't assign one */
  if(!newBoard.background_image){
    let randomIndex = Math.floor(Math.random() * 19)
    let randomBackground = backgroundURLs[randomIndex]
    newBoard.background_image = randomBackground
  }

  return (dispatch, getStore) => {

    /* figure out type of board to send appropriate fetch */
    if(owner.type === "user"){
      newBoard.user_id = owner.id
    }
    else {
      newBoard.team_id = owner.id
    }

    fetch(`${HEROKU_API}${owner.type}_boards`, {
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

/* board here also has type attr of either team or user to help set up right fetch */
export const deletingBoard = board => {
  return (dispatch, getStore) => {
    let user = getStore().user

    fetch(`${HEROKU_API}${board.type}_boards/${board.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(allBoards => {
      /* currently getting back all boards (either team or user; filter to find appropriate boards and then assign )*/
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

export const editingBoard = board => {
  return dispatch => {
    fetch(`${HEROKU_API}${board.type}_boards/${board.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(board)
    })
    .then(res => res.json())
    .then(newBoard => {
      if(board.type === "user")
        dispatch(editUserBoard(newBoard))
      else {
        dispatch(editTeamBoard(newBoard))
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

export const reorganizingUserBoard = board => {
  return { type: "REORGANIZE_USER_BOARD", board }
}

export const reorganizingTeamBoard = board => {
  return { type: "REORGANIZE_TEAM_BOARD", board }
}
