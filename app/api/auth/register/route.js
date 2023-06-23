import { hashSync } from 'bcrypt';
import { db } from '@/utils/db';

export async function POST(req, res) {
  const data = await req.json();
  const { email, password } = data;

  const hashedPassword = hashSync(password, 10);

  try {
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
}
