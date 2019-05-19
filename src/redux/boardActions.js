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
