import React, { useState } from 'react';
import { useMagicContext } from '../../context/magic';
import magic from '../../magic';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { setState } = useMagicContext();

  const loginWithMagic = async (email: string) => {
    const user = await magic.auth.loginWithMagicLink({ email });
    localStorage.setItem('MAGIC_TOKEN', user!);
    setState(user);
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setLoading(true);
    loginWithMagic(email);
    setLoading(false);
  };

  return (
    <div className="container mx-auto mt-5 flex flex-col w-full max-w-md px-4 py-8 bg-gradient-to-br from-indigo-800 via-indigo-700 to-purple-500  rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-light text-gray-50 sm:text-2xl dark:text-white">
        Login To Your Account
      </div>
      <div className="my-8">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <div className="form-control">
            <input
              className="input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <button className="btn btn-primary btn-block" type="submit">
              {loading && (
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"></path>
                </svg>
              )}
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
