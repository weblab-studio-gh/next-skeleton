import SectionHeader from "@/components/data_display/sectionHeader/SectionHeader";
import Table from "@/components/data_display/table/Table";
import { prisma } from "@/lib/services/prisma";
import { Prisma } from "@prisma/client";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const getData = async () => {
  const posts = await prisma.post.findMany();

  return posts.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });
};

export default async function Page() {
  const posts = await getData();
  const session = await getServerSession(authOptions);
  const columns = Prisma.dmmf.datamodel.models
    .find((model) => model.name === "Post")
    .fields.map((field) => {
      // if (field?.kind === "scalar") return field.name;

      const fields = {
        name: field.name,
        kind: field.kind,
        type: field.type,
        isRequired: field.isRequired,
        isId: field.isId,
      };
      return fields;
    });

  const deleteData = async (id) => {
    "use server";
    await prisma.post.delete({
      where: {
        id: id,
      },
    });

    const posts = await getData();

    return posts;
  };

  const bulkDeleteData = async (ids) => {
    "use server";
    await prisma.post.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    const posts = await getData();

    return posts;
  };

  const updateData = async (id, data) => {
    "use server";
    data.updatedAt = new Date();
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
    const posts = await getData();

    return posts;
  };

  const createData = async (data) => {
    "use server";

    data.createdAt = new Date();
    data.updatedAt = new Date();
    const getUserId = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });
    data.authorId = getUserId.id;

    await prisma.post.create({
      data: {
        ...data,
      },
    });
    const posts = await getData();

    return posts;
  };

  return (
    <div className="min-h-[100vh] bg-primary-light dark:bg-primary-dark">
      <Suspense fallback={<div>Loading...</div>}>
        <Table
          data={posts}
          columns={columns}
          deleteData={deleteData}
          createData={createData}
          updateData={updateData}
          bulkDeleteData={bulkDeleteData}
        />
      </Suspense>
    </div>
  );
}
