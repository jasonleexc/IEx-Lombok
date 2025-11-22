import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';

import axios from '../api/axios';
import { isAxiosError } from 'axios';
const LOGIN_URL = '/auth';

const Login = () => {
  const auth = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false); 
  
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, 
        JSON.stringify({ user, pwd }), 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      auth?.setAuth({ user, pwd, roles, accessToken})
      setUser('');
      setPwd('');
      setSuccess(true);
      // error handling
    } catch (err) {
      if (isAxiosError(err)) {
        if (!err.response) {
          setErrMsg('No Server Response');
        } else if (err.response.status === 400) {
          setErrMsg('Missing Username or Password');
        } else if (err.response.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Login Failed');
        }
      } else {
        // non-Axios error
        setErrMsg('Login Failed');
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
      ) : (

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

         <p ref={errRef} className={errMsg ? "errsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                value={user}
                onChange={(e) => setUser(e.target.value)}
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
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
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
    )}
  </>
  );

};

export default Login;
