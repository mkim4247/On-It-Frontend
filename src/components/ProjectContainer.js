import React from 'react'
import { connect } from 'react-redux'
import { deletingProject } from '../redux/actions'
import TodoContainer from './TodoContainer'
import TodoForm from './TodoForm'
import CommentForm from './CommentForm'
import CommentContainer from './CommentContainer'

class ProjectContainer extends React.Component {

  deleteProject = event => {
    this.props.deletingProject(this.props.project, this.props.path)
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


        Add a Todo
        <TodoForm project={this.props.project} path={this.props.path}/>
      </div>

      <CommentForm project={this.props.project} />
      <CommentContainer project={this.props.project} />
      </div>
    )
  }

}

export default connect(null, { deletingProject })(ProjectContainer)
