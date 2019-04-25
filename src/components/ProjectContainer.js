import React from 'react'
import { connect } from 'react-redux'
import { deletingUserProject, addingUserTodo } from '../redux/actions'
import TodoContainer from './TodoContainer'

class ProjectContainer extends React.Component {

  deleteProject = event => {
    this.props.deletingUserProject(this.props.project)
  }

  addUserTodo = event => {
    this.props.addingUserTodo({title: "Test Todo", user_project_id: this.props.project.id}, this.props.project)
  }

  render(){
    return(
      <div className='project-container'>
      {this.props.project.name}
      <div>
        Description: {this.props.project.description}
      </div>
      <button onClick={this.deleteProject}> Delete Project </button>
      <div>
        {this.props.project.todos.map( user_todo => (
          <TodoContainer todo={user_todo} project={this.props.project} key={user_todo.title + user_todo.id}/>
        ))}
        <button onClick={this.addUserTodo}>
          Add a Todo
        </button>
      </div>
      </div>
    )
  }

}

export default connect(null, { deletingUserProject, addingUserTodo })(ProjectContainer)
