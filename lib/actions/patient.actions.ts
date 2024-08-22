import { ID, Query } from 'node-appwrite';
import { users } from '../appwrite.config';

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log('lkadjfla sdflkjkasdflkj ')
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name,
    );
    console.log("new user is", newuser)
    return newuser;
  }
  catch (error: any) {
    console.log(error)
    if(error && error?.code === 409){
      const existingUser = await users.list([
        Query.equal('email', [user.email])
      ])

      return existingUser?.users[0];
    }
  }
}