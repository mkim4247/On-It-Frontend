import React from 'react'
import { connect } from 'react-redux'
import { setTeamForShowPage, addingNewBoard } from '../redux/actions'
import Nav from './Nav'
import Sidebar from './SideBar'
import BoardCard from './BoardCard'
import UsersList from './UsersList'
import EmptyBoardCard from './EmptyBoardCard'
import { Header, Icon, Segment, Item, Button, Form, Modal } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class TeamShow extends React.Component {

  state = {
    name: "",
    description: "",
    background_image: "",
    showModal: false
  }

  setTeamFromParams = () => {
    if(this.props.user){
      let team = this.props.user.teams.find( team => team.name === this.props.match.params.team )

      if(team){
        this.props.setTeamForShowPage(team)
      }
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    let owner = {...this.props.team, type: "team"}
    event.preventDefault()
    event.target.reset()
    this.props.addingNewBoard(this.state, owner)
    this.setState({
      showModal: false
    })
  }

  openModal = () => {
    this.setState({
      showModal: true
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false
    })
  }

  componentDidMount(){
    this.setTeamFromParams()
  }

  componentDidUpdate(){
    this.setTeamFromParams()
  }

  render(){
    const { showModal } = this.state

    return(
      <div>
        <Nav />
        <div className='home'>
          <Sidebar ownProps={this.props}/>
          <div className='home-board-container'>
            {this.props.team ?
              <div>
                <Header as='h1' icon textAlign='center'>
                  <Icon name='users' circular/>
                  {this.props.team.name}
                </Header>
                <Header sub textAlign='center'>
                  {this.props.team.description}
                </Header>
                <Segment secondary padded>
                  {this.props.team ?
                    <Item.Group divided>
                      <Header as='h3' textAlign='center'>
                        Team Boards:
                      </Header>
                      {this.props.team.boards.map( board => (
                        <Item>
                          <Item.Image
                            size='tiny'
                            src={board.background_image}
                          />
                          <Item.Content>
                            <Item.Header
                              as={NavLink}
                              to={`/team/${this.props.team.name}/${board.name}`}>
                              {board.name}
                            </Item.Header>
                            <Item.Meta>
                              {board.description}
                            </Item.Meta>
                          </Item.Content>
                        </Item>
                      ))}
                      <Item>
                        <Item.Content>
                          <Button
                            fluid
                            color='teal'
                            onClick={this.openModal}>
                            + Add Board
                          </Button>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                    : null
                  }
                </Segment>
              </div>
              : null
            }
          </div>
          <UsersList team={this.props.team}/>
        </div>

        <Modal
          onClose={this.closeModal}
          open={showModal}
          size='mini'>
          <Modal.Header>
            Add Board
          </Modal.Header>

          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label htmlFor='name'>
                  Board
                </label>
                <Form.Input
                  type='text'
                  name='name'
                  placeholder='Name'
                  onChange={this.handleChange}
                  required/>
              </Form.Field>
              <Form.Field>
                <label htmlFor='description'>
                  Description (optional)
                </label>
                <Form.Input
                  type='text'
                  name='description'
                  placeholder='Description'
                  onChange={this.handleChange}/>
              <Form.Field>
                <label htmlFor='background_image'>
                  Background Image (optional)
                </label>
                <Form.Input
                  type='text'
                  name='background_image'
                  placeholder="Image URL"
                  onChange={this.handleChange}/>
              </Form.Field>
                <Button
                  type='submit'
                  color='teal'
                  fluid>
                  Submit
                </Button>
              </Form.Field>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    team: state.team
  }
}

export default connect(mapStateToProps, { setTeamForShowPage, addingNewBoard })(TeamShow)
