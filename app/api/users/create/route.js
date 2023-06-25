import { NextResponse } from 'next/server';
import prisma from '@/lib/db/db';
import { saveImageToServer } from '@/utils/_helpers';
import { hashSync } from 'bcrypt';
import { revalidatePath } from 'next/cache';

export async function POST(req, res) {
  const formData = await req.formData();
  const image = formData.get('image');
  console.log(image);
  let data = {
    name: formData.get('name'),
    email: formData.get('email'),
    type: formData.get('type'),
    password: formData.get('new_password'),
  };

  try {
    data.password = hashSync(data.password, 10);
    const user = await prisma.user.create({
      data: data,
    });

    const id = user.id;

    if (image.size > 0) {
      const imagePath = await saveImageToServer(
        image,
        `/images/users/${id}/${image.name}`,
        `/public/images/users/${id}`
      );
      data.image = imagePath;
      await prisma.user.update({
        where: {
          id: id,
        },
        data: data,
      });
    } else {
      delete data.image;
    }
  } catch (error) {
    console.log('SERVER ERROR: ', error);
  }

  // return 200 status and JSON object
  revalidatePath('http://localhost:3000/dashboard/users/');
  revalidatePath('api/users/create');
  return new NextResponse(200);
}
