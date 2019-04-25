import { combineReducers } from 'redux'

const userReducer = (state=null, action) => {
  let userCopy;
  let userBoardCopy;
  let userProjectCopy;
  let teamCopy;

  switch(action.type){
    case "SET_USER":
      return action.user

    case "ADD_USER_BOARD":
      userBoardCopy = [...state.user_boards, action.user_board]
      userCopy = {...state, user_boards: userBoardCopy}
      return userCopy
    case "DELETE_USER_BOARD":
      userCopy = {...state, user_boards: action.user_boards}
      return userCopy
    case "ADD_USER_PROJECT":
      userBoardCopy = state.user_boards.map( board => {
        if(board.id === action.board.id){
          return {...board, projects: [...board.projects, action.user_project]}
        }
        else {
          return board
        }
      })

      userCopy = {...state, user_boards: userBoardCopy}
      return userCopy

    case "DELETE_USER_PROJECT":
      userBoardCopy = state.user_boards.map( board => {
        if(board.id === action.board.id){
          return {...board, projects: action.user_projects}
        }
        else {
          return board
        }
      })
      userCopy = {...state, user_boards: userBoardCopy}

      return userCopy
    case "ADD_USER_TODO":
      userBoardCopy = state.user_boards.map( board => {
        if(board.id === action.project.user_board_id){
          userProjectCopy = board.projects.map( project => {
            if(project.id === action.project.id){
              return {...project, todos: [...project.todos, action.user_todo]}
            }
            else {
              return project
            }
          })
          return {...board, projects: userProjectCopy}
        }
        else {
          return board
        }
      })

      userCopy = {...state, user_boards: userBoardCopy}
      return userCopy

      case "DELETE_USER_TODO":
        userBoardCopy = state.user_boards.map( board => {
          if(board.id === action.project.user_board_id){
            userProjectCopy = board.projects.map( project => {
              if(project.id === action.project.id){
                return {...project, todos: action.user_todos}
              }
              else {
                return project
              }
            })
            return {...board, projects: userProjectCopy}
          }
          else {
            return board
          }
        })

        userCopy = {...state, user_boards: userBoardCopy}
        return userCopy

      case "ADD_NEW_TEAM":
        teamCopy = [...state.teams, action.team]
        userCopy = {...state, teams: teamCopy}
        return userCopy
      case "DELETE_TEAM":
        userCopy = {...state, teams: action.teams}
        return userCopy
    default:
      return state
  }
}

const boardReducer = (state=null, action) => {
  switch(action.type){
    case "SET_BOARD":
      return action.board
    case "DELETE_USER_BOARD":
      return null
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  board: boardReducer,
})

export default rootReducer;
