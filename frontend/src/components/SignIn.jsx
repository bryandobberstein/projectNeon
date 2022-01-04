import { useState } from 'react';

const SignIn = () => {
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

  const submitHandler = () => {
    console.log(login);
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='email'>Email</label>
      <input
        type='text'
        name='email'
        id='email'
        value={login.email}
        onChange={inputChangeHandler}
      />
      <label htmlFor='password'></label>
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
