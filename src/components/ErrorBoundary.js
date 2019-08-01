import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      error: null,
      info: null
    }
  }

  componentDidCatch(error, info){
    this.setState({
      error: error,
      info: info
    })
  }

  render(){
    return(
    <div> error boundary </div>
    // if(this.state.info){
    //   return(
    //     <div>
    //       Oops.... Looks like something went wrong.
    //       <br/>
    //       Please try refreshing the page.
    //       <br/>
    //       {this.state.error && this.state.error.toString()}
    //     </div>
    //   )
    // }
    // return this.props.children
    )
  }
}

export default ErrorBoundary
