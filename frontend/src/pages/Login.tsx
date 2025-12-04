import { useRef, useState, useEffect, useContext } from 'react';
import { useAuth } from '../context/AuthProvider';

import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../utils/auth.util';
import { isAxiosError } from 'axios';
const LOGIN_URL = '/auth';

export const LoginPage: React.FC = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); // to store error messages
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false); 

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await loginRequest({ username: username, password, email})
      localStorage.setItem('token', response.token);
      setAuth({ token: response.token, user: response.user });
      navigate('/Home');
      // error handling
    } catch (err: any) {
      if (isAxiosError(err)) {
        if (!err.response) {
          setErrorMsg('No Server Response');
        } else if (err.response.status === 400) {
          setErrorMsg('Missing Username or Password');
        } else if (err.response.status === 401) {
          setErrorMsg('Unauthorized');
        } else {
          setErrorMsg('Login Failed');
        }
      } else {
        // non-Axios error
        setErrorMsg('Login Failed');
      }
      errRef.current?.focus();
    }
  }

  return (
    <>
      {success ? (

        <section className="min-h-screen flex items-center justify-center bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="bg-white p-8 rounded-lg shadow">
              <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Success!</h1>
              <p className="mt-2 text-center text-sm text-gray-600">You have successfully logged in.</p>

              <div className="mt-6">
                <a
                  href="/Home"
                  className="group relative w-full inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : 

    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/register" className="font-medium text-primary-600 hover:text-primary-500">
              create a new account
            </a>
          </p>
        </div>

         <p ref={errRef} className={errorMsg ? "errsg" : "offscreen"} aria-live="assertive">
          {errorMsg}
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                ref={userRef}
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              ref={userRef}
              autoComplete="off"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Forgot your password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div> 
    }
  </>
  );

};

export default LoginPage;
