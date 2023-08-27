import { User } from '@/models/user';
import db from '@db/db';
import bcrypt from 'bcrypt';

interface Credientials {
  password: string;
  email: string;
}

export async function registerUser(creds: Credientials): Promise<User | null> {
  const { email, password } = creds;
  const user = await getUser(email);

  if (user) {
    return null;
  } else {
    const hashedPw = await hashPassword(password);
    if (!hashedPw) {
      return null;
    } else {
      const newUser = await saveUser({ email, hashedPw });
      if (newUser) {
        return newUser;
      }
      return null;
    }
  }
}

export async function getUsers(): Promise<User[]> {
  const res = await db.select('*').from<User>('users');
  return res;
}
export async function getUserByEmail(email: User['email']): Promise<User | null> {
  const result = await db.select('*').from<User>('users').where('email', email);
  if (result.length === 1) {
    return result[0];
  } else if (result.length > 1) {
    console.log('multiple users found by same email');
    return null;
  } else {
    console.log(`no user found for the email: ${email}`);
    return null;
  }
}
export async function getUser(email: User['email']): Promise<User | null> {
  try {
    return getUserByEmail(email);
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function saveUser(user: { email: string; hashedPw: string }): Promise<User | null> {
  try {
    await db('users').insert({ email: user.email, password: user.hashedPw });
    const newUser = await getUserByEmail(user.email);
    return newUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function hashPassword(pw: string): Promise<string> {
  const hashedPw = await bcrypt.hash(pw, 10);
  if (hashedPw) {
    console.log('password hashing successful');
  } else {
    console.log('sth went wrong while hashing');
  }
  return hashedPw;
}
export async function validatePassword(password: string, hashedPassword: string) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.log(error);
  }
}
