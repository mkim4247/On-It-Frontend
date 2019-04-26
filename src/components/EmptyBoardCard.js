import React from 'react'
import { connect } from 'react-redux'
import { addingNewBoard } from '../redux/actions'

class EmptyBoardCard extends React.Component {
  state = {
    name: "",
    description: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    event.target.reset()
    this.props.addingNewBoard(this.state, this.props.owner)
  }

  render(){
    return(
      <div className='board-card'>
        Add a Board
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='name' placeholder='Name' onChange={this.handleChange} required/>
          <input type='text' name='description' placeholder='Description' onChange={this.handleChange}/>
          <input type='submit'/>
        </form>
      </div>
    )
  }

}

export default connect(null, { addingNewBoard })(EmptyBoardCard)
