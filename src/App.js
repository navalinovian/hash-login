import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
const bcrypt = require('bcryptjs')


function App() {
  const [state, setState] = useState(0)
  return (
    <div className="App">
      <div className="App-body">
        <button type="button" class="btn btn-success" onClick={() => setState(state + 1)}>Change Page</button>
        <img src={logo} className="App-logo" alt="logo" />
        {state % 2 === 0 ? <Register /> : <Login />}
      </div>
    </div>
  );
}

const Register = () => {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")


  const handleRegister = async () => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        var Cred = [
          {
            username: username,
            password: hash
          }
        ];
        localStorage.setItem('Cred', JSON.stringify(Cred));
      });
    });
  }

  return (
    <div>
      <h1>Register</h1>
      <>
        <div class="mb-3 row">
          <div className='mb-3 col-3'>
            <label for="first">Username:</label>
          </div>
          <div className='col-9'>
            <input type="text" id="first" name="first" onChange={(e) => setUsername(e.target.value)} />
          </div>
        </div>
        <div class="mb-3 row">
          <div className='mb-3 col-3'>
            <label for="last">Password:</label>
          </div>
          <div className='mb-3 col-9'>
            <input type="text" id="last" name="last" onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <button type="button" class="btn btn-primary btn-lg" onClick={() => handleRegister()}>Submit</button>
      </>
    </div>
  )
}

const Login = () => {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [status, setStatus] = useState(null)

  const handleLogin = async () => {

    const Cred = JSON.parse(localStorage.getItem('Cred'));
    if (Cred) {
      const user = Cred.find(obj => obj.username === username);
      const hash = user.password
      bcrypt.compare(password, hash, function (err, res) {
        if (res) {
          setStatus(1)
        } else {
          setStatus(0)
        }
      });
    }

  }

  return (
    <div>
      <h1>Login</h1>
      <div>
      <div class="mb-3 row">
          <div className='mb-3 col-3'>
            <label for="first">Username:</label>
          </div>
          <div className='col-9'>
            <input type="text" id="first" name="first" onChange={(e) => setUsername(e.target.value)} />
          </div>
        </div>
        <div class="mb-3 row">
          <div className='mb-3 col-3'>
            <label for="last">Password:</label>
          </div>
          <div className='mb-3 col-9'>
            <input type="text" id="last" name="last" onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <button type="button" class="btn btn-primary btn-lg" onClick={() => handleLogin()}>Submit</button>
      </div>
      {status !== null ? status ? <div>
        <h1>Login Berhasil</h1>
      </div> : <div>
        <h1>Login Gagal</h1>
      </div> : <div>
        <h1>Silahkan Login</h1>
      </div>}
    </div>
  )
}

export default App;
