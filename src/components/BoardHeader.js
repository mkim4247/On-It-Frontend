import React from 'react'
import { connect } from 'react-redux'
import { deletingBoard, leavingTeam} from '../redux/actions'
import { Redirect } from 'react-router-dom'
import { Header, Card, Button, Modal, Menu, Popup, Icon, Form } from 'semantic-ui-react'
import TeammateContainer from './TeammateContainer'

class BoardHeader extends React.Component {
  state = {
    redirect: false,
    showModal: false
  }

  deleteBoard = event => {
    let confirm = window.confirm("Are you sure?")
    if(confirm){
      this.props.deletingBoard(this.props.board, this.props.path)
      this.setState({ redirect: true })
    }
  }

  leaveTeam = event => {
    this.props.leavingTeam(this.props.team)
    this.setState({ redirect: true })
  }

  showModal = event => {
    this.setState({
      showModal: true
    })
  }

  closeModal = event => {
    this.setState({
      showModal: false
    })
  }


  render(){
    const { showModal } = this.state
    return(
      this.state.redirect ?
        <Redirect to='/home' />
        :
      <div>
        {this.props.board ?
          <Menu borderless>
            <Menu.Menu position='left'>
              <Menu.Item>
                <Header as='span'>
                  {this.props.board.name}
                </Header>
              </Menu.Item>
            </Menu.Menu>

            <Menu.Menu position='right'>

              <Menu.Item>
                {this.props.team.users.map( user => (
                  <Popup trigger={
                      <span style={{
                      border: '1px solid black', height: '30px', width: '30px', borderRadius: '50%', textAlign: 'center', backgroundColor: '#42f4e2'
                    }}>
                      <strong style={{position: "relative", top: '25%'}}>{user.first_name[0] + user.last_name[0]}</strong>
                  </span>
                }
                content={`${user.first_name} ${user.last_name}`}
              />
                ))}
              </Menu.Item>

              <Menu.Item onClick={this.showModal}>
                <Button icon>
                <Icon name='ellipsis horizontal' />
                </Button>
              </Menu.Item>
            </Menu.Menu>

          </Menu>

         : null }



        <Modal open={showModal} size='small' onClose={this.closeModal}>
          {this.props.board ?

          <Modal.Content>
          <Card fluid>
            <Card.Content>
          <Card.Header>
              {this.props.board.name}
          </Card.Header>
        </Card.Content>
          <Card.Content>
            <Card.Description>
              Description:
              <div>
                {this.props.board.description}
              </div>
            </Card.Description>

            </Card.Content>
            <Card.Content>
              {this.props.team ?
                <TeammateContainer team={this.props.team}/>
                : null
              }
            </Card.Content>
            <Card.Content>
              <Button onClick={this.leaveTeam} fluid color='teal'>
                Leave Team
              </Button>
            </Card.Content>
            <Card.Content>
            <Button onClick={this.deleteBoard} fluid color='teal'>
              Delete Board
            </Button>
          </Card.Content>
        </Card>
      </Modal.Content>
      : null
      }
        </Modal>
      </div>

    )
  }
}

export default connect(null, { deletingBoard, leavingTeam })(BoardHeader)
