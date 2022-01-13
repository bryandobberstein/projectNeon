import React, { useState } from 'react';

const SignIn = props => {
  const [login, setlogin] = useState({
    email: '',
    password: '',
  });
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(null);

  const inputChangeHandler = e => {
    setlogin({
      ...login,
      [e.target.name]: e.target.value,
    });
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
    switch (result.status) {
      case 200:
        seterror(false);
        props.setauthenticated(true);
        break;
      case 403:
        seterror(true);
        setmessage('Incorrect email or password');
        break;
      case 500:
        seterror(true);
        setmessage('Sorry, please try again');
        break;
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='email'>{login.email}</label>
      <input
        type='text'
        name='email'
        id='email'
        value={login.email}
        onChange={inputChangeHandler}
      />
      <label htmlFor='password'>{login.password}</label>
      <input
        type='password'
        name='password'
        id='password'
        value={login.password}
        onChange={inputChangeHandler}
      />
      <button type='submit' onClick={submitHandler}>
        Login
      </button>
    </form>
  );
};

export default SignIn;
