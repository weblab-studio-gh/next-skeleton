'use client';

import { getCsrfToken } from 'next-auth/react';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function LoginForm({ handleSubmit }) {
  const [token, setToken] = useState();

  useEffect(() => {
    getCsrfToken().then((data) => {
      setToken(data);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input name="csrfToken" type="hidden" defaultValue={token} />
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark"
        >
          email
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full appearance-none rounded-md border border-primary-light dark:border-primary-dark px-3 py-2 placeholder-gray-400 bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-sm font-medium bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full appearance-none rounded-md border  border-primary-light dark:border-primary-dark px-3 py-2 placeholder-gray-400 bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
