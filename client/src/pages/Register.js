import {useState} from 'react';
import { useHistory } from 'react-router-dom'

function Register() {
  const history = useHistory()
  
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  async function registerUser(event){
    event.preventDefault() // prevents the forms to not submit default headers and data

    const response = await fetch('http://localhost:1337/api/register' , {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },  
      body: JSON.stringify({
          name,
          email,
          password
        }),
    })
    
    const data = await response.json() 
    if (data.status === 'ok') {
			history.push('/login')
		}
 
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value ={name}
          onChange={(e) => setName(e.target.value)}
          type="text" 
          placeholder="Name"/>
        <br ></br>
        <input 
          value = {email}
          onChange={(e) => setEmail(e.target.value)}
          type="email" 
          placeholder="Email"/>
        <br></br>
        <input
          value ={password}
          onChange={(e) => setPassword(e.target.value)} 
          type="password" 
          placeholder="Password"/>
        <br></br>
        <input type="submit" value='Register'/>
      </form>
    </div>
  );
}

export default Register;
