import React, { useState } from 'react';

const SignIn = props => {
  const [login, setlogin] = useState({
    email: '',
    password: '',
  });

  const inputChangeHandler = e => {
    setlogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

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
          email: login.email,
          password: login.password,
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
    <form onSubmit={submitHandler} style={formStyle}>
      <label htmlFor='email' style={labelStyle}>Email</label>
      <input
        style={inputStyle}
        type='text'
        name='email'
        id='email'
        value={login.email}
        onChange={inputChangeHandler}
      />
      <label htmlFor='password' style={labelStyle}>Password</label>
      <input
        style={inputStyle}
        type='password'
        name='password'
        id='password'
        value={login.password}
        onChange={inputChangeHandler}
      />
      <button type='submit' onClick={submitHandler} style={buttonStyle}>
        Login
      </button>
    </form>
  );
};

export default SignIn;
