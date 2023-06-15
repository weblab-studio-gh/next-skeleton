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
import { authOptions } from '../../@/app/api/auth/[...nextauth]/route';
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
    .find((model) => model.name === 'Integration')

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
      profile: {
        include: {
          integrations: true,
        },
      },
    },
  });

  const createProfile = async (profile) => {
    'use server';
    // IF no profile exists, create one
    const res = await prisma.integration.create({
      data: {
        ...profile,
        profile: {
          connect: {
            userId: user.id || '',
          },
        },
      },
    });
  };

  const saveProfile = async (profile) => {
    'use server';
    // check if profile exists
    const profileExists = await prisma.integration.findUnique({
      where: {
        profileId: user.profile?.id || '',
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
          profile: {
            include: {
              integrations: true,
            },
          },
        },
      });
      return updatedUser.profile.integrations[0];
    }
    // if profile exists, update it

    const res = await prisma.integration.update({
      where: {
        profileId: user.profile?.id,
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
        profile: {
          include: {
            integrations: true,
          },
        },
      },
    });
    return updatedUser.profile.integrations[0];
  };
  return (
    <>
      <div>
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
                          data={user.profile.integrations[0]}
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
