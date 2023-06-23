import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs-extra';
import path from 'path';

// export const config = {
//   api: {
//     responseLimit: "10mb",
//   },
//   bodyParser: {
//     sizeLimit: "8mb",
//   },
// };
export async function POST(req, res) {
  const formData = await req.formData();

  const image = formData.get('imageFile');

  // save the file to the public folder
  const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  let fileType;
  if (fileTypes.includes(image.type)) {
    fileType = image.type.split('/')[1];
  } else {
    return NextResponse.json({ success: false });
  }

  const fileName = formData.get('name') + '.' + fileType;
  const filePath = path.join(process.cwd(), 'public', 'images', fileName);

  // create buffer from the file object
  const buffer = await image.arrayBuffer();
  // write the buffer to the file system
  await fs.writeFile(filePath, Buffer.from(buffer));

  return NextResponse.json({ success: true });
}
