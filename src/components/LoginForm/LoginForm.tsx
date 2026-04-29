import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './LoginForm.module.css';

/**
 * LoginForm component that renders a username/password form.
 *
 * On a successful login it navigates the user to `/dashboard`.
 * On a failed login it displays an inline error message via `ErrorMessage`.
 *
 * Authentication state is sourced from `useAuthContext`; routing from
 * `react-router-dom`'s `useNavigate`.
 */
function LoginForm(): React.JSX.Element {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  /** Clears the error, then updates username state. */
  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setError('');
    setUsername(e.target.value);
  }

  /** Clears the error, then updates password state. */
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setError('');
    setPassword(e.target.value);
  }

  /**
   * Submits the login form.
   *
   * Calls `login` from `AuthContext`. If it returns `true`, navigates to
   * `/dashboard`; otherwise sets an error message for the user.
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const success = login(username, password);

    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password.');
    }
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
        aria-label="Login form"
      >
        <h1 className={styles.heading}>Login</h1>

        <div className={styles.field}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className={styles.input}
            value={username}
            onChange={handleUsernameChange}
            autoComplete="username"
            autoFocus
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Login
        </button>

        <ErrorMessage message={error} />
      </form>
    </div>
  );
}

export default LoginForm;
