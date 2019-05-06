import React from 'react'
import { connect } from 'react-redux'
import { assigningUserTeamTodo, unassigningUserTeamTodo } from '../../redux/actions'
import { Card, Modal, Button, Header, Icon } from 'semantic-ui-react'
import EditTodo from './EditTodo'

class TodoContainer extends React.Component {
  state = {
    showModal: false,
    showEdit: false
  }

  openModal = todo => {
    this.setState({ showModal: true })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  openEdit = () => {
    this.setState({
      showEdit: true
    })
  }

  closeEdit = () => {
    this.setState({
      showEdit: false
    })
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
    const { showEdit } = this.state

    return(
      <div>
        <Card
          fluid
          onClick={this.openModal}
          style={{color: "black"}} >
          <Card.Content>
            <Card.Description>
              <strong>{this.props.todo.title}</strong>
            </Card.Description>

            <Card.Meta>
              {`Due: ${this.formatDueDate(this.props.todo)}`}
            </Card.Meta>
            <div style={{float: 'right'}}>
              {this.props.todo.users ?
                this.props.todo.users.map( user => (
                  <span
                    key={`todo-${user.id}`}
                    style={
                      user.username === this.props.user.username ?
                      {
                        border: '1px solid black',
                        height: '1em',
                        width: '1em',
                        borderRadius: '50%',
                        padding: '5px',
                        backgroundColor: 'yellow'
                      }
                      :
                      {
                      border: '1px solid black',
                      height: '1em',
                      width: '1em',
                      borderRadius: '50%',
                      padding: '5px',
                      backgroundColor: '#42f4e2'
                    }}>
                    <strong
                      style={{
                        position: "relative",
                        top: '25%'}}>
                        {user.first_name[0] + user.last_name[0]}
                    </strong>
                  </span>
                ))
                : null
              }
            </div>
          </Card.Content>
        </Card>

        <Modal
          size='tiny'
          onClose={this.closeModal}
          open={showModal}>
          <Modal.Content>
            <Card fluid>
              <Card.Content>
                <Button
                  icon
                  floated="right"
                  onClick={this.openEdit}>
                  <Icon name='ellipsis horizontal'/>
                </Button>
                <Card.Header>
                  {this.props.todo.title}
                </Card.Header>
                <Header sub textAlign='right'>
                  {`Due: ${this.formatDueDate(this.props.todo)}`}
                </Header>
                <Card.Description>
                  Description:
                  <div>
                    {this.props.todo.description}
                  </div>
                </Card.Description>
              </Card.Content>

              {this.props.project.type === 'team' ?
                <Card.Content>
                    {this.props.todo && this.props.todo.users ?
                      this.props.todo.users.find( user => user.username === this.props.user.username) ?
                        <Button
                          onClick={this.unassignTodo}
                          fluid
                          color='teal'>
                          Hop Off
                        </Button>
                        :
                        <Button
                          onClick={this.assignTodo}
                          fluid
                          color='teal'>
                          Hop On
                        </Button>
                      : null
                    }
                </Card.Content>
                : null
              }
            </Card>
          </Modal.Content>
        </Modal>

        {showEdit ?
          <EditTodo
            showEdit={this.state.showEdit}
            closeEdit={this.closeEdit}
            todo={this.props.todo}
            project={this.props.project} />
          :
          null
        }

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { assigningUserTeamTodo, unassigningUserTeamTodo })(TodoContainer)
