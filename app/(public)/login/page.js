'use client';
import { signIn } from 'next-auth/react';
import LoginForm from '../../../components/partials/forms/LoginForm';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import useThemeContext from '@/context/theme/useContext';

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();

  const { setNotification } = useThemeContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: email.value,
        password: password.value,
        action: 'credentials',
        callbackUrl: `${pathname}/dashboard`,
      });
      if (!res.error) router.push(`/dashboard`);
      if (res.error) {
        setNotification({
          type: 'error',
          title: 'Error',
          message: res.error,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      // router.push(`/dashboard`);
    }
  };

  return (
    <div className="flex h-[100vh] bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark">
              Or{' '}
              <Link
                className="font-medium text-teal-light dark:text-teal-dark hover:text-color-light dark:hover:text-color-dark"
                href="/register"
              >
                register a new account
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <LoginForm handleSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
}
