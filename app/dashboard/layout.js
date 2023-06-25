import '@/app/globals.css';
import { redirect } from 'next/navigation';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import ThemeProviders from '@/context/theme/provider';

import Navbar from '@/components/app_shell/navbar/Navbar';
import Sidebar from '@/components/app_shell/sidebar/Sidebar';
import MainPageLayout from '@/components/ui/containers/MainPageLayout';

async function authUser() {
  return await getServerSession(authOptions);
}

export default async function RootLayout({ children }) {
  const session = await authUser();

  if (!session) {
    redirect('/login');
  }
  return (
    <html
      className="h-full bg-primary-light dark:bg-primary-dark overflow-hidden"
      suppressHydrationWarning
      lang="en"
    >
      <body
        aria-live="assertive"
        className="flex h-[100%] bg-primary-light dark:bg-primary-dark"
      >
        <ThemeProviders>
          <Sidebar />

          <div
            className="flex flex-col overflow-y-scroll w-[100%]"
            // className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
          >
            <Navbar />
            <MainPageLayout>{children}</MainPageLayout>
          </div>
        </ThemeProviders>
      </body>
    </html>
  );
}
