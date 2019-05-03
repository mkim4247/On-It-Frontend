import React from 'react'
import { connect } from 'react-redux'
import { acceptingTeamInvite, deletingTeamInvite } from '../redux/actions'
import { Card, Menu, Modal, Button } from 'semantic-ui-react'

class Invites extends React.Component {

  state = {
    showModal: false,
    invite: {}
  }

  showModal = (invite) => {
    this.setState({
      showModal: true,
      invite: invite
    })
  }

  closeModal = event => {
    this.setState({
      showModal: false
    })
  }

  acceptTeamInvite = invite => {
    this.props.acceptingTeamInvite(invite)
    this.setState({
      showModal: false
    })
  }

  deleteTeamInvite = invite => {
    this.props.deletingTeamInvite(invite)
    this.setState({
      showModal: false
    })
  }


  render(){
    const { showModal } = this.state

    return(
      <div className='right-container'>
        <Menu
          vertical
          secondary
          fluid
          size='massive'>
          <Menu.Item header>
            INVITES
          </Menu.Item>
          <Menu.Menu>
            {this.props.user ?
              this.props.user.invitations.map( invite => (
                <Menu.Item
                  key={`inv-${invite.id}`}
                  onClick={ () => this.showModal(invite)}>
                  {`+ ${invite.team.name}`}
                </Menu.Item>
              ))
              : null
            }
          </Menu.Menu>
        </Menu>

        {this.state.invite.team ?
          <Modal
            open={showModal}
            onClose={this.closeModal}
            size='tiny'>
            <Modal.Content>
              <Card fluid>
                <Card.Content>
                  <Card.Header>
                    {this.state.invite.team.name}
                  </Card.Header>
                </Card.Content>
                <Card.Content>
                  <Card.Description>
                    {this.state.invite.team.description}
                  </Card.Description>
                </Card.Content>
                <Card.Content>
                  Invited by:
                  <div>
                    {`${this.state.invite.sender.first_name} ${this.state.invite.sender.last_name}`}
                  </div>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button
                      basic
                      color='green'
                      onClick={ () => this.acceptTeamInvite(this.state.invite) }>
                      Accept Invite
                    </Button>
                    <Button
                      basic
                      color='red'
                      onClick={ () => this.deleteTeamInvite(this.state.invite) }>
                      Decline Invite
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Modal.Content>
          </Modal>
          : null
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

export default connect(mapStateToProps, { acceptingTeamInvite, deletingTeamInvite })(Invites)
