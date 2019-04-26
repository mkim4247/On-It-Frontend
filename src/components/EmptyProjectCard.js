import React from 'react'
import { connect } from 'react-redux'
import { addingNewProject } from '../redux/actions'

class EmptyProjectCard extends React.Component {
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
    this.props.addingNewProject(this.state, this.props.board)
  }

  render(){
    return(
      <div className='project-container'>
        add project
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='name' placeholder='Name' onChange={this.handleChange} required/>
          <br/>
          <input type='text' name='description' placeholder='Description' onChange={this.handleChange}/>
          <br/>
          <input type='submit'/>
        </form>
      </div>
    )
  }
}

export default connect(null, {addingNewProject})(EmptyProjectCard)
