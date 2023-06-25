import { NextResponse } from 'next/server';
import prisma from '@/lib/db/db';
import { revalidatePath } from 'next/cache';

export async function POST(req, res) {
  const data = await req.json();

  if (data) {
    const resp = await prisma.user.delete({ where: { id: data } });
    console.log('User deleted', resp);
    revalidatePath('http://localhost:3000/dashboard/users');
    return new NextResponse(200);
  } else {
    return new NextResponse(500);
  }
}
