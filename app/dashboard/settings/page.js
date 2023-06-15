import {
  ArrowLeftOnRectangleIcon,
  Bars3BottomLeftIcon,
  BellIcon,
  BriefcaseIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CogIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import AppNav from '@/components/app_shell/appNav/AppNav';

import { getServerSession } from 'next-auth';
import { authOptions } from '../@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/services/prisma';
import { Prisma } from '@prisma/client';

import Image from 'next/image';
import ProfileForm from '@/components/partials/forms/ProfileForm';
import ProfileField from '@/components/partials/profile/ProfileField';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default async function Page() {
  const profileFields = Prisma.dmmf.datamodel.models
    .find((model) => model.name === 'Profile')

    .fields.map((field) => {
      return {
        name: field.name,
        type: field.type,
        required: field.isRequired,
        isId: field.isId,
        kind: field.kind,
      };
    });
  const { user: sessionUser } = await getServerSession(authOptions);

  // get user
  const user = await prisma.user.findUnique({
    where: {
      email: sessionUser.email,
    },
    include: {
      profile: true,
    },
  });

  const createProfile = async (profile) => {
    'use server';
    // IF no profile exists, create one
    const res = await prisma.profile.create({
      data: {
        ...profile,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  };

  const saveProfile = async (profile) => {
    'use server';
    // check if profile exists
    const profileExists = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });
    // if profile does not exist, create one
    if (!profileExists) {
      await createProfile(profile);
      const updatedUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        include: {
          profile: true,
        },
      });
      return updatedUser.profile;
    }
    // if profile exists, update it

    const res = await prisma.profile.update({
      where: {
        userId: user.id,
      },
      data: {
        ...profile,
      },
    });

    const updatedUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        profile: true,
      },
    });
    return updatedUser.profile;
  };

  return (
    <>
      {/*
        This example requires updating your template:
        ```
        <html class="h-full bg-primary-light dark:bg-primary-dark">
        <body class="h-full">
        ```
      */}
      <div>
        {/* Content area */}

        <main className="flex-1">
          <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0">
            <div className="pt-10 pb-16">
              <div className="px-4 sm:px-6 md:px-0">
                <h1 className="text-3xl font-bold tracking-tight text-primary-light dark:text-primary-dark">
                  Settings
                </h1>
              </div>
              <div className="px-4 sm:px-6 md:px-0">
                <div className="py-6">
                  {/* Tabs */}

                  {/* Description list with inline editing */}
                  <div className="mt-10 divide-y divide-gray-200">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium leading-6 text-primary-light dark:text-primary-dark">
                        User
                      </h3>
                      <p className="max-w-2xl text-sm text-secondary-light dark:text-secondary-dark">
                        This information will be displayed publicly so be careful what you
                        share.
                      </p>
                    </div>
                    <div className="mt-6">
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                          <dt className="text-sm font-medium text-secondary-light dark:text-secondary-dark">
                            Name
                          </dt>
                          <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">{user.name}</span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="rounded-md bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                          <dt className="text-sm font-medium text-secondary-light dark:text-secondary-dark">
                            Photo
                          </dt>
                          <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">
                              <Image
                                className="h-8 w-8 rounded-full"
                                src={user.image}
                                width={32}
                                height={32}
                                alt=""
                              />
                            </span>
                            <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
                              <button
                                type="button"
                                className="rounded-md bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                              >
                                Update
                              </button>
                              <span
                                className="text-secondary-light dark:text-secondary-dark"
                                aria-hidden="true"
                              >
                                |
                              </span>
                              <button
                                type="button"
                                className="rounded-md bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                              >
                                Remove
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                          <dt className="text-sm font-medium text-secondary-light dark:text-secondary-dark">
                            Email
                          </dt>
                          <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">{user.email}</span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                disabled
                                className="rounded-md line-through	 bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-secondary-light dark:border-secondary-dark sm:py-5">
                          <dt className="text-sm font-medium text-secondary-light dark:text-secondary-dark">
                            Job title
                          </dt>
                          <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">Human Resources Manager</span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="rounded-md bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="mt-10 divide-y divide-gray-200">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium leading-6 text-primary-light dark:text-primary-dark">
                        Profile
                      </h3>
                      <p className="max-w-2xl text-sm text-secondary-light dark:text-secondary-dark">
                        Manage how information is displayed on your account.
                      </p>
                    </div>
                    <div className="mt-6">
                      <dl className="divide-y divide-gray-200">
                        <ProfileField
                          save={saveProfile}
                          fields={profileFields}
                          user={user}
                          data={user.profile}
                        />
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
