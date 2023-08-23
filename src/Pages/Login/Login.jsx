import { useState } from "react"
import { Container } from "react-bootstrap"
import { validateLoginForm } from "../../Services/validateLoginForm"
import { useContextGlobal } from "../../Context/global.context"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const {state} =  useContextGlobal()
  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = (e) =>{
    e.preventDefault()
    const validation = validateLoginForm(user.username, user.password)
    if(Object.keys(validation).length === 0 ){
      const {registered_users} = state

      const userFound = registered_users.find(userFromList => userFromList.username === user.username)
      if(userFound){
        if (userFound.password === user.password){
          navigate('/')
        }else{
          alert('password incorrect')
        }
      }else{
        alert('User not found')
      }


    }else{
      alert(validation.username || validation.password);
    }
  }

  const handleInput = (e) =>{
    e.target.name === "username"
      ? setUser({...user, username: e.target.value})
      : setUser({...user, password: e.target.value})
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInput} name="username" type="text" placeholder="Username" value={user.username}/>
        <input onChange={handleInput} name="password" type="password" placeholder="Password" value={user.password}/>
        <button>Login</button>
      </form>
    </Container>
  )
}

export default Login