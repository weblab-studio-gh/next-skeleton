import UserDetails from '@/components/partials/user/UserDetails';
import prisma from '@/lib/db/db';

const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
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
  return user;
};

export default async function page({ params }) {
  const data = await getUser(params.id);

  console.log(data);
  return (
    <main>
      <UserDetails data={data} />
    </main>
  );
}
