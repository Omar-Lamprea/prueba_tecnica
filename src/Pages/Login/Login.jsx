import { useState } from "react"
import { Container } from "react-bootstrap"
import { validateLoginForm } from "../../Services/validateLoginForm"
import { useContextGlobal } from "../../Context/global.context"
import { useNavigate } from "react-router-dom"
import './Login.scss'

const Login = () => {
  const navigate = useNavigate()
  const {state, dispatch} =  useContextGlobal()
  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = (e) =>{
    e.preventDefault()
    const validation = validateLoginForm(user.username, user.password)

    if(Object.keys(validation).length === 0 ){
      const {registered_users} = state
      validateUser(registered_users, user)
    }else{
      alert(validation.username || validation.password);
    }
  }

  const handleInput = (e) =>{
    e.target.name === "username"
      ? setUser({...user, username: e.target.value})
      : setUser({...user, password: e.target.value})
  }

  const validateUser = (registered_users, user_state) =>{
    const userFound = registered_users.find(userFromList => userFromList.username === user_state.username)
      if(userFound){
        if (userFound.password === user_state.password){
          dispatch({
            type: 'setUser',
            payload: user_state
          })
          navigate('/')
        }else{
          alert('password incorrect')
        }
      }else{
        alert('User not found')
      }
  }

  return (
    <Container className="login">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInput} name="username" type="text" placeholder="Username" value={user.username}/>
        <input onChange={handleInput} name="password" type="password" placeholder="Password" value={user.password}/>
        <button>Login</button>
      </form>
    </Container>
  )
}

export default Login