import { NextResponse } from 'next/server';
import prisma from '@/lib/db/db';
import { saveImageToServer } from '@/utils/_helpers';
import { revalidatePath } from 'next/cache';
import { hashSync } from 'bcrypt';

export async function POST(req, res) {
  const formData = await req.formData();
  const id = formData.get('id');
  let data = {
    name: formData.get('name'),
    email: formData.get('email'),
    image: formData.get('image'),
    type: formData.get('type'),
    password: formData.get('new_password'),
  };

  if (data.image.size > 0) {
    const imagePath = await saveImageToServer(
      data.image,
      `/images/users/${data.id}/${data.image.name}`,
      `/public/images/users/${id}`
    );
    data.image = imagePath;
  } else {
    delete data.image;
  }

  if (data.password !== undefined) {
    const hashedPassword = hashSync(data.password, 10);
    data.password = hashedPassword;
  } else {
    delete data.password;
  }

  try {
    // save user in transaction
    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: id,
        },
        data: data,
      }),
    ]);
  } catch (error) {
    console.log('SERVER ERROR: ', error);
  }

  revalidatePath('http://localhost:3000/dashboard/users');
  // return 200 status and JSON object
  return new NextResponse(200);
}
