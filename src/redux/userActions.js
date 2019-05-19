// const RAILS_API = 'http://localhost:4247/api/v1/'
const HEROKU_API = 'https://on-it-backend.herokuapp.com/api/v1/'
const HEADERS = { "Content-type": "application/json", "Accept": "application/json" }

/* USER RELATED ACTIONS*/
export const setUser = user => {
  return { type: "SET_USER", user }
}

export const settingUser = user => {
  return dispatch => {
    fetch(HEROKU_API + 'login', {
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
        console.log('Login Successful', data.user_info)
        dispatch(setUser(data.user_info))
        localStorage.setItem('token', data.token)
      }
    })
  }
}

export const creatingNewUser = user => {
  return dispatch => {
    fetch(HEROKU_API + 'users', {
      method:"POST",
      headers: HEADERS,
      body: JSON.stringify({ user })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        alert(data.error)
      }
      else {
        console.log('New User Created')
        dispatch(setUser(data.user))
        localStorage.setItem('token', data.token)
      }
    })
  }
}

export const checkingToken = token => {
  return dispatch => {
    fetch(HEROKU_API + 'profile', {
    method: "GET",
    headers: {
      "Authentication": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(user => {
      if(user.error){
        alert('Invalid Token')
        localStorage.clear()
      }
      else {
        console.log(`Welcome Back, ${user.username}`, user)
        dispatch(setUser(user))
      }
    })
  }
}

export const editingUser = user => {
  return (dispatch, getStore) => {
    let currentUser = getStore().user

    fetch(`${HEROKU_API}users/${currentUser.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({ user })
    })
    .then(res => res.json())
    .then(newUser => {
      if(newUser.errors){
        alert('Update Failed')
        console.log(newUser.errors)
      }
      else {
        console.log(`Updated`, newUser)
        dispatch(setUser(newUser))
      }
    })
  }
}

export const deletingUser = () => {
  return (dispatch, getStore) => {
    let user = getStore().user

    fetch(`${HEROKU_API}users/${user.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      dispatch(setUser(null))
    })
  }
}
