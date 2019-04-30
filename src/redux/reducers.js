import { combineReducers } from 'redux'

const userReducer = (state=null, action) => {
  let userCopy;
  let userBoardCopy;
  let userProjectCopy;
  let teamCopy;
  let teamBoardCopy;
  let teamProjectCopy;

  switch(action.type){
    case "SET_USER":
      return action.user

    case "ADD_USER_BOARD":
      userBoardCopy = [...state.boards, action.user_board]
      userCopy = {...state, boards: userBoardCopy}
      return userCopy
    case "DELETE_USER_BOARD":
      userCopy = {...state, boards: action.user_boards}
      return userCopy
    case "ADD_USER_PROJECT":
      userBoardCopy = state.boards.map( board => {
        if(board.id === action.board.id){
          return {...board, projects: [...board.projects, action.user_project]}
        }
        else {
          return board
        }
      })

      userCopy = {...state, boards: userBoardCopy}
      return userCopy

    case "DELETE_USER_PROJECT":
      userBoardCopy = state.boards.map( board => {
        if(board.id === action.board.id){
          return {...board, projects: action.user_projects}
        }
        else {
          return board
        }
      })
      userCopy = {...state, boards: userBoardCopy}

      return userCopy
    case "ADD_USER_TODO":
      userBoardCopy = state.boards.map( board => {
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

      userCopy = {...state, boards: userBoardCopy}
      return userCopy

      case "DELETE_USER_TODO":
        userBoardCopy = state.boards.map( board => {
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

        userCopy = {...state, boards: userBoardCopy}
        return userCopy



      case "ADD_NEW_TEAM":
        teamCopy = [...state.teams, action.team]
        userCopy = {...state, teams: teamCopy}
        return userCopy
      case "DELETE_TEAM":
        userCopy = {...state, teams: action.teams}
        return userCopy

      case "ADD_TEAM_BOARD":
        teamCopy = state.teams.map( team => {
          if(team.id === action.team_board.team_id){
            return {...team, boards: [...team.boards, action.team_board]}
          }
          else {
            return team
          }
        })
        userCopy = {...state, teams: teamCopy}
        return userCopy

      case "DELETE_TEAM_BOARD":
        teamCopy = state.teams.map( team => {
          if(team.id === action.teamID){
            return {...team, boards: action.team_boards}
          }
          else {
            return team
          }
        })
        userCopy = {...state, teams: teamCopy}
        return userCopy

      case "ADD_TEAM_PROJECT":
        teamCopy = state.teams.map( team => {
          if(team.id === action.board.team_id){
            teamBoardCopy = team.boards.map( team_board => {
              if( team_board.id === action.board.id ){
                return {...action.board, projects: [...action.board.projects, action.team_project]}
              }
              else {
                return team_board
              }
            })
            return {...team, boards: teamBoardCopy}
          }
          else {
            return team
          }
        })
        userCopy = {...state, teams: teamCopy}
        return userCopy

      case "DELETE_TEAM_PROJECT":
        teamCopy = state.teams.map( team => {
          if(team.id === action.team_board.team_id){
            teamBoardCopy = team.boards.map( team_board => {
              if( team_board.id === action.team_board.id ){
                return {...team_board, projects: action.team_projects}
              }
              else {
                return team_board
              }
            })
            return {...team, boards: teamBoardCopy}
          }
          else {
            return team
          }
        })
        userCopy = {...state, teams: teamCopy}
        return userCopy
      case "ADD_TEAM_TODO":
        teamCopy = state.teams.map( team => {
          teamBoardCopy = team.boards.map( board => {
            if(board.id === action.project.team_board_id){
              teamProjectCopy = board.projects.map( project => {
                if(project.id === action.project.id){
                  return {...project, todos: [...project.todos, action.team_todo]}
                }
                else {
                  return project
                }
              })
              return {...board, projects: teamProjectCopy}
            }
            else {
              return board
            }
          })
          return {...team, boards: teamBoardCopy}
        })
        userCopy = {...state, teams: teamCopy}
        return userCopy
    case "DELETE_TEAM_TODO":
    teamCopy = state.teams.map( team => {
      teamBoardCopy = team.boards.map( board => {
        if(board.id === action.project.team_board_id){
          teamProjectCopy = board.projects.map( project => {
            if(project.id === action.project.id){
              return {...project, todos: action.team_todos}
            }
            else {
              return project
            }
          })
          return {...board, projects: teamProjectCopy}
        }
        else {
          return board
        }
      })
      return {...team, boards: teamBoardCopy}
    })
    userCopy = {...state, teams: teamCopy}
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
