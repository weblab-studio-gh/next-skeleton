'use server';
import fs from 'fs-extra';
import path from 'path';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { cookies, headers } from 'next/headers';
import { getServerSession as originalGetServerSession } from 'next-auth';

export async function saveImageToServer(file, filePath, folderPath) {
  const data = await file;
  if (data.size === 0) {
    throw new Error('No file was uploaded');
  }
  if (!filePath) {
    throw new Error('Path to file is required');
  }
  if (!folderPath) {
    throw new Error('Path to folder is required');
  }
  let imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (!imageTypes.includes(data.type)) {
    throw new Error('invalid image type');
  }
  const imageType = data.type.split('/')[1]; //eg. image/png => png
  const pathWithTypeName = filePath + '.' + imageType; //eg. /images/avatars/123.png
  let buffer = await data.arrayBuffer(); //converts file to buffer

  if (!fs.existsSync(path.join(process.cwd(), folderPath))) {
    //if folder doesn't exist, create it
    fs.mkdirSync(path.join(process.cwd(), folderPath));
  }

  await fs.writeFile(
    //write file to server
    path.join(process.cwd(), 'public/', pathWithTypeName),
    Buffer.from(buffer)
  );
  return pathWithTypeName; //return path to file
}

export async function sendToWebsocket({ type, message }) {
  const req = {
    headers: Object.fromEntries(headers()),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  };
  const res = { getHeader() {}, setCookie() {}, setHeader() {} };

  // @ts-ignore - The type used in next-auth for the req object doesn't match, but it still works
  const session = await originalGetServerSession(req, res, authOptions); // This workaround is required because of a bug in next-auth please refer to this issue: https://github.com/nextauthjs/next-auth/issues/7486

  try {
    await fetch(
      `http://localhost:3000/api/send-message?type=${type}&message=${message}&userID=${session.user.id}` //local
    );
  } catch (err) {
    console.log('err', err);
  }
}
export async function formDataToObj(formData) {
  const obj = {};
  for (const key of formData.keys()) {
    if (key.match(/\$ACTION_ID_*/)) {
      continue;
    }
    const value = formData.getAll(key); // Using getAll instead of get
    obj[key] = value.length > 1 ? value : value[0];
  }
  return obj;
}
