const RAILS_API = 'http://localhost:4247/api/v1/'
const HEADERS = { "Content-type": "application/json" }

/* USER RELATED ACTIONS*/
export const setUser = user => {
  return { type: "SET_USER", user }
}

export const settingUser = user => {
  return dispatch => {
    fetch(RAILS_API + 'login', {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        alert('Incorrect username and/or password')
      }
      else{
        console.log('Login Successful')
        dispatch(setUser(data.user_info))
        localStorage.setItem('token', data.token)
      }
    })
  }
}

// export const creatingNewUser = user => {
//   return dispatch => {
//     fetch(RAILS_API + 'users', {
//       method:"POST",
//       headers: HEADERS,
//       body: JSON.stringify({ user })
//     })
//     .then(res => res.json())
//     .then(data => {
//       if(data.error){
//         alert(data.error)
//       }
//       else {
//         console.log('New User Created')
//         dispatch(setUser(data.user))
//         localStorage.setItem('token', data.token)
//       }
//     })
//   }
// }

export const checkingToken = token => {
  return dispatch => {
    fetch(RAILS_API + 'profile', {
    method: "GET",
    headers: {
      "Authentication": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        alert('Invalid Token')
        localStorage.clear()
      }
      else {
        console.log(`Welcome Back, ${data.user.username}`)
        dispatch(setUser(data.user))
      }
    })
  }
}
