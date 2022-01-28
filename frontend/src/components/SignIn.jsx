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
