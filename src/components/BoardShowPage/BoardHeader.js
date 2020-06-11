import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Header, Card, Button, Modal, Menu, Popup, Icon } from 'semantic-ui-react'
import { deletingBoard } from '../../redux/boardActions'
import InviteForm from '../InviteForm'
import EditBoard from './EditBoard'
import PropTypes from 'prop-types';

class BoardHeader extends React.Component {

  state = {
    redirect: false,
    showEdit: false
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

  deleteBoard = event => {
    let confirm = window.confirm("Are you sure you want to delete this board?")

    if(confirm){
      this.props.deletingBoard(this.props.board)

      this.setState({
        redirect: true
      })
    }
  }

  render(){
    const { showEdit } = this.state

    return(
      this.state.redirect ?
        <Redirect to='/boards' />
        :
        <div>
          {this.props.board ?
            <Menu borderless>
              <Menu.Menu position='left'>
                <Menu.Item>
                  <Header as='span'>
                    {this.props.board.name}
                  </Header>
                  <Header sub>
                    {this.props.board.description}
                  </Header>
                </Menu.Item>
              </Menu.Menu>
              <Menu.Menu position='right'>
                {this.props.team ?
                  <Menu.Item>
                    {this.props.team.users.map( user => (
                      <Popup
                        key={`pop-${user.id}`}
                        trigger={
                          <span
                            style={{
                              border: '1px solid black', height: '30px',
                              width: '30px',
                              borderRadius: '50%',
                              textAlign: 'center',
                              backgroundColor: '#42f4e2'}}>
                            <strong
                              style={{
                                position: "relative",
                                top: '25%'}}>
                              {user.first_name[0] + user.last_name[0]}
                            </strong>
                          </span>
                        }
                        content={`${user.first_name} ${user.last_name}`}
                      />
                    ))}
                  </Menu.Item>
                  :
                  null
                }

                <Menu.Item>
                  <Button
                    icon
                    onClick={this.openEdit}>
                    <Icon name='ellipsis horizontal' />
                  </Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>
            :
            null
          }

          <Modal
            onClose={this.closeEdit}
            open={showEdit}
            size='tiny'>
            <Modal.Content>
              <Card fluid>
                <EditBoard
                  closeEdit={this.closeEdit}
                  board={this.props.board}/>
                {this.props.team ?
                  <Card.Content>
                    <InviteForm team={this.props.team}/>
                  </Card.Content>
                  :
                  null
                }
                <Card.Content>
                  <Button
                    onClick={this.deleteBoard}
                    fluid
                    color='red'>
                    Delete Board
                  </Button>
                </Card.Content>
              </Card>
            </Modal.Content>
          </Modal>
        </div>
    )
  }
}

export default connect(null, { deletingBoard })(BoardHeader)
