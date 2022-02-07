import React, { useState, useRef } from 'react';

const SignIn = props => {

  const email = useRef();
  const password = useRef();
  const confirm = useRef();
  const [loginOrRegister, setloginOrRegister] = useState('register');

  const getExpirationDate = () => {
    return new Date(Date.now() + 864000);
  };

  const submitHandler = async e => {
    e.preventDefault();
    const result = await fetch(
      'http://localhost:8000/user/authenticate',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
        }),
      }
    );
    if (result.status === 200) {
      props.cookieHandler(
        'authenticate',
        true,
        getExpirationDate()
      );
    }
  };

  const registerHandler = async e => {
    e.preventDefault();
    const result = await fetch(
      'http://localhost:8000/user/signup',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
          verifyPW: confirm.current.value,
        }),
      }
    );
    if (result.status === 200) {
      props.cookieHandler(
        'authenticate',
        true,
        getExpirationDate()
      );
    }
  };

  const formStyle = {
    display: 'grid',
    margin: '100px',
    width: '400px',
    gridTemplateColumns: '1fr 1fr',
    justifyItems: 'left',
    gap: '10px',
  };

  const labelStyle = {
    gridColumn: '1',
  };

  const inputStyle = {
    gridColumn: '2',
  };

  const buttonStyle = {
    gridColumn: '1/ span 2',
    // width: 'fit-content',
    justifySelf: 'center',
  };

  return (
    <div>
      {loginOrRegister === 'login' &&
        <span>
          <form onSubmit={submitHandler} style={formStyle}>
            <label htmlFor='email' style={labelStyle}>Email</label>
            <input
              style={inputStyle}
              type='text'
              name='email'
              id='email'
              ref={email}
            />
            <label htmlFor='password' style={labelStyle}>Password</label>
            <input
              style={inputStyle}
              type='password'
              name='password'
              id='password'
              ref={password}
            />
            <button type='submit' onClick={submitHandler} style={buttonStyle}>
              Login
            </button>
          </form>
          <span onClick={() => setloginOrRegister('register')}>Click here to register</span>
        </span>
      }
      {loginOrRegister === 'register' &&
        <span>
          <form onSubmit={registerHandler} style={formStyle}>
            <label htmlFor='email' style={labelStyle}>Email</label>
            <input
              style={inputStyle}
              type='text'
              name='email'
              id='email'
              ref={email}
            />
            <label htmlFor='password' style={labelStyle}>Password</label>
            <input
              style={inputStyle}
              type='password'
              name='password'
              id='password'
              ref={password}
            />
            <label htmlFor='confirm' style={labelStyle}>Password</label>
            <input
              style={inputStyle}
              type='password'
              name='confirm'
              id='confirm'
              ref={confirm}
            />
            <button type='submit' onClick={registerHandler} style={buttonStyle}>
              Register
            </button>
            <span onClick={() => setloginOrRegister('login')}>Click here to log in</span>
          </form>
        </span>
      }
    </div>
  );
};

export default SignIn;
