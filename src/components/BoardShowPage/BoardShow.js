import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd';
import { setBoardForShowPage, reorganizingUserBoard, reorganizingTeamBoard } from '../../redux/boardActions'
import { reorganizingTodos } from '../../redux/todoActions'
import Nav from '../Nav'
import BoardHeader from './BoardHeader'
import ProjectContainer from './ProjectContainer'
import EmptyProjectCard from './EmptyProjectCard'

class BoardShow extends React.Component {

  setBoardFromParams = () => {
    // find and set the right user board or team board to show
    if(this.props.user){
      if(this.props.path === "user"){
        //board should match the name and id given in params (avoids duplicate board name bugs)
        let user_board = this.props.user.boards.find( board => (board.name === this.props.match.params.board) && (board.id === parseInt(this.props.match.params.board_id)) )

        if(user_board){
          this.props.setBoardForShowPage(user_board)
        }
      }
      else {
        //have to find right team before finding right board here
        let team = this.props.user.teams.find( team => (team.name === this.props.match.params.team) && (team.id === parseInt(this.props.match.params.team_id)) )

        let team_board = team.boards.find( board => (board.name === this.props.match.params.board) && (board.id === parseInt(this.props.match.params.board_id)) )

        if(team_board){
          this.props.setBoardForShowPage(team_board)
        }
      }
    }
  }

  componentDidMount(){
    this.setBoardFromParams()
  }

  componentDidUpdate(){
    this.setBoardFromParams()
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result
    // result object made from React-DND, includes destination and source objects; draggableId is todoId here
    console.log(result)
    // if no destination, do nothing
    if(!destination) {
      return
    }
    // check if location has changed, if not then do nothing
    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return
    }
    // find right original project
    let originalProject = this.props.board.projects.find( project => project.id === source.droppableId )
    // find right new project
    let newProject = this.props.board.projects.find( project => project.id === destination.droppableId)
    // assign its type to help with fetch
    if(this.props.path === "user"){
      originalProject.type = 'user'
    }
    else {
      originalProject.type = 'team'
    }

    if(originalProject === newProject){
      // make copy of todos
      let reorganizedTodos = originalProject.todos.slice()
      // find the right todo object
      let movedTodo = reorganizedTodos.find( todo => todo.id === draggableId )
      // remove the todo that's moving
      reorganizedTodos.splice(source.index, 1)
      // put the todo in its new spot
      reorganizedTodos.splice(destination.index, 0, movedTodo)
      // need to reassign indeces now
      reorganizedTodos.forEach( (todo, index) => {
        todo.display_order = index
        this.props.reorganizingTodos(todo, originalProject)
      })
      return
    }
    else {
      //need to reorganize original's and new project's todos
      let originalTodos = originalProject.todos.slice()
      let newTodos = newProject.todos.slice()

      // find the todo object that's moving
      let movedTodo = originalTodos.find( todo => todo.id === draggableId )
      movedTodo[`${this.props.path}_project_id`] = newProject.id

      // remove the todo that's moving
      originalTodos.splice(source.index, 1)
      // reassign the indeces for todos still there
      originalTodos.forEach( (todo, index) => {
        todo.display_order = index
        this.props.reorganizingTodos(todo, originalProject)
      })
      // put the todo in the new project
      newTodos.splice(destination.index, 0, movedTodo)
      // need to reassign indeces now
      newTodos.forEach( (todo, index) => {
        todo.display_order = index
        this.props.reorganizingTodos(todo, originalProject)
      })

      let projects = this.props.board.projects.map( project => {
        if(project.id === originalProject.id){
          return {...originalProject, todos: originalTodos}
        }
        else if(project.id === newProject.id){
          return {...newProject, todos: newTodos}
        }
        else {
          return project
        }
      })

      let board = {...this.props.board, projects: projects}

      if(this.props.path === "user"){
        this.props.reorganizingUserBoard(board)
      }
      else {
        this.props.reorganizingTeamBoard(board)
      }
    }
  }

  // props are passed down and given "type" attribute here to make dispatched actions easier/more abstract //

  render(){
    return(
      <div>
        <Nav/>
        <div
          id='board-container'
          style={
            this.props.board ?
              {backgroundImage: `url(${this.props.board.background_image})`}
              : null
          }>
          <BoardHeader
            ownProps={this.props.ownProps}
            board={
              this.props.path === "user" ?
                {...this.props.board, type: "user"}
                :
                {...this.props.board, type: "team"}
              }
            team={
              this.props.user ?
                this.props.user.teams.find( team => team.name === this.props.match.params.team )
                : null
              }
          />
          <div id='board-projects-container'>
            <DragDropContext onDragEnd={this.onDragEnd}>
              {this.props.board ?
                this.props.board.projects.map( project => (
                  <ProjectContainer
                    key={`pc-${project.name}${project.id}`}
                    project={
                      this.props.path === "user" ?
                        {...project, type: "user"}
                        :
                        {...project, type: "team"}
                    }
                  />
                ))
                : null
              }
            </DragDropContext>
            <EmptyProjectCard
              board={
                this.props.path === "user" ?
                  {...this.props.board, type: "user"}
                  :
                  {...this.props.board, type: "team"}
                }
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    board: state.board
  }
}

export default connect(mapStateToProps, { setBoardForShowPage, reorganizingTodos, reorganizingUserBoard, reorganizingTeamBoard })(BoardShow)
