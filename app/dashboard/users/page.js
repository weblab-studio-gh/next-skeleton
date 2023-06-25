import Grid from '@/components/partials/grid/Grid';
import prisma from '@/lib/db/db';
import Link from 'next/link';

const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      type: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return users;
};

export default async function page() {
  const data = await getUsers();

  return (
    <>
      <div className=" font-bold py-2 px-4 mb-2 w-20 flex justify-center items-center rounded-2xl  bg-primary-light dark:bg-primary-dark text-secondary-light dark:text-secondary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark hover:text-primary-light dark:hover:text-primary-dark">
        <Link href="/dashboard/users/add">Add</Link>
      </div>
      <Grid items={data} />
    </>
  );
}
