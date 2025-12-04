import React, { useRef, useEffect, useState } from 'react';
import { faCheck, faTimes, faInfoCircle, faPray } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../utils/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {

  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);
  const [user, setUser] = useState<string>('');
  const [validName, setValidName] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>('');
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []); 

  // valid username 
  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  } , [pwd, matchPwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

 

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
      if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      setSuccess(true);
      // clear input fields
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Unsuccessful');
      }

      errRef.current?.focus();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/login" className="font-medium text-primary-600 hover:text-primary-500">
              sign in to your existing account
            </a>
          </p>
        </div>

        <p ref={errRef} className={errMsg ? "errsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
                <div className="relative inline-block ml-2">
                {validName ? (
                  <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                ) : user ? (
                  <FontAwesomeIcon icon={faTimes} className="text-red-500" />
                ) : null}
              </div>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                ref={userRef}
                autoComplete="off"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={user}
                onChange={(e) => setUser(e.target.value)} // ties input to user state
                aria-invalid={validName ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
            </div>

            <div>
              
            <p
              id="uidnote"
              className={userFocus && user && !validName 
                ? "instructions" 
                : "offscreen"}
              style={{ fontSize: "12px" }}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              4 to 24 characters. <br />
              Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>
        </div>
            
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
              <div className="relative inline-block ml-2">
                {validPwd ? (
                  <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                ) : pwd ? (
                  <FontAwesomeIcon icon={faTimes} className="text-red-500" />
                ) : null}
              </div>
            </label>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => {setPwd(e.target.value)}}
                aria-invalid={validPwd ? 'false' : 'true'}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />     
            </div>
          </div>
          
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            style={{ fontSize: "12px" }}
          >
            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
            8 to 24 characters. <br />
            Must include uppercase and lowercase letters, a number and a special character.
          </p>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
            <div className="relative inline-block ml-2">
              {validMatch && matchPwd ? (
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
              ) : matchPwd ? (
                <FontAwesomeIcon icon={faTimes} className="text-red-500" />
              ) : null}
            </div>
          </label>
          <div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
              onChange={(e) => {setMatchPwd(e.target.value)}}
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
          </div>
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? 'text-xs text-gray-500 mt-1 flex items-center' : 'sr-only'}
          >
            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
            Must match the first password input field.
          </p>
        </div>   

        <div>
          <button disabled={!validName || !validPwd || !validMatch ? true : false}
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
)};

export default Register;
