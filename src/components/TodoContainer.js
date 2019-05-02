import React from 'react'
import { connect } from 'react-redux'
import { deletingTodo, assigningUserTeamTodo, unassigningUserTeamTodo } from '../redux/actions'
import { Card, Modal, Button } from 'semantic-ui-react'

class TodoContainer extends React.Component {
  state = {
    showModal: false
  }

  openModal = todo => {
    this.setState({ showModal: true })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  deleteTodo = event => {
    this.props.deletingTodo(this.props.todo, this.props.project)
  }

  assignTodo = event => {
    this.props.assigningUserTeamTodo(this.props.todo, this.props.project)
  }

  unassignTodo = event => {
    this.props.unassigningUserTeamTodo(this.props.todo)
  }

  formatDueDate = todo => {
    if(todo.due_date){
      let dateArr = todo.due_date.split('-')
      let due_date = dateArr.slice(1).concat(dateArr.slice(0, 1)).join('-')
      return due_date
    }
    else {
      return " "
    }
  }

  render(){
    const { showModal } = this.state

    return(
      <div id='todo-container'>
        <Card fluid onClick={this.openModal} style={{color: "black"}} >
          <Card.Content>
            <div>
              {this.props.todo.title}
            </div>
            <Card.Meta>
            <div>
              {`Due: ${this.formatDueDate(this.props.todo)}`}
            </div>
          </Card.Meta>

            <div style={{float: 'right'}}>
               {this.props.todo.users ?
                 this.props.todo.users.map( user => (
                   <span key={user.username + 'todo'} style={{
                       border: '1px solid black', height: '1em', width: '1em', borderRadius: '50%', padding: '5px', backgroundColor: '#42f4e2'
                     }}>
                     <strong style={{position: "relative", top: '25%'}}>{user.first_name[0] + user.last_name[0]}</strong>
                   </span>
                 ))
                 : null
               }
           </div>

     </Card.Content>

     </Card>


       <Modal size='tiny' onClose={this.closeModal} open={showModal}>
         <Modal.Content>
           <Card fluid>
             <Card.Content>

               <Card.Header>
                 {this.props.todo.title}
               </Card.Header>
               <Card.Meta textAlign='right'>
                   {`Due: ${this.formatDueDate(this.props.todo)}`}
               </Card.Meta>
             </Card.Content>
             <Card.Content>
               <Card.Description fluid>
                 Description:
                 <br/>
                   {this.props.todo.description}
               </Card.Description>
            </Card.Content>
               <Card.Content>
                   On It:
                   <div>
                   {this.props.todo && this.props.todo.users ?
                     this.props.todo.users.map( user => {
                       return <div> {`${user.first_name} ${user.last_name}`} </div>
                     })
                   : null
                     }
                   </div>
               </Card.Content>
           <Card.Content>
             {this.props.todo && this.props.todo.users.find( user => user.username === this.props.user.username) ?
               <Button onClick={this.unassignTodo} fluid color='teal'>
                 Hop Off
               </Button>
               :
               <Button onClick={this.assignTodo} fluid color='teal'>
                 Hop On
               </Button>
             }
           </Card.Content>
           <Card.Content>
           <Button onClick={this.deleteTodo} fluid color='teal'>
            Delete Task
          </Button>
        </Card.Content>


        </Card>

         </Modal.Content>
       </Modal>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { deletingTodo, assigningUserTeamTodo, unassigningUserTeamTodo })(TodoContainer)
