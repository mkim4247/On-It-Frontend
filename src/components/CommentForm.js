import React from 'react'
import { connect } from 'react-redux'
import { postingNewComment } from '../redux/actions'

class CommentForm extends React.Component {
  state = {
    content: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    event.target.reset()
    this.props.postingNewComment(this.state, this.props.project)
  }

  render(){
    return(
      <div>
      Add a comment
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} name="content"/>
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default connect(null, { postingNewComment })(CommentForm)
