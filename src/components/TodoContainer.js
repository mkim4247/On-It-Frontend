import React from 'react'
import { connect } from 'react-redux'
import { deletingUserTodo } from '../redux/actions'

class TodoContainer extends React.Component {

  deleteTodo = event => {
    this.props.deletingUserTodo(this.props.todo, this.props.project)
  }

  render(){
    return(
      <div>

       {this.props.todo.title}:
       {this.props.todo.description}
       <button onClick={this.deleteTodo}>
        Delete Todo
       </button>
      </div>
    )
  }
}

export default connect(null, { deletingUserTodo })(TodoContainer)
