import React from 'react'
import { connect } from 'react-redux'
import { deletingTodo, assigningUserTeamTodo } from '../redux/actions'

class TodoContainer extends React.Component {

  deleteTodo = event => {
    this.props.deletingTodo(this.props.todo, this.props.project)
  }

  assignTodo = event => {
    this.props.assigningUserTeamTodo(this.props.todo)
  }

  render(){
    return(
      <div>

       {this.props.todo.title}:
       {this.props.todo.description}
       <div>
         {this.props.todo.due_date}
       </div>
       {this.props.todo.users ?
         this.props.todo.users.map( user => (
           <div key={user.username + 'todo'}>
             {user.username}
           </div>
         ))
         : null
       }
       <button onClick={this.assignTodo}>
         Sign up todo
       </button>
       <button onClick={this.deleteTodo}>
        Delete Todo
       </button>
      </div>
    )
  }
}

export default connect(null, { deletingTodo, assigningUserTeamTodo })(TodoContainer)
