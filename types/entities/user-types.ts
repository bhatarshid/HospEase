export type UserData = {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string   
  password: string
  profilePicture?: string | null,
  refreshToken?: string | null,
  createdAt: Date
  updatedAt: Date 
}

export type CreateUserInput = Omit<UserData, 'id' | 'createdAt' | 'updatedAt' | 'profilePicture' | 'refreshToken'>;
export type UserDataType = Omit<UserData, 'password'>;
export type SignupResponse = Omit<UserDataType, 'refreshToken' | 'profilePicture'>;
export type LoginResponse = Omit<UserData, 'password'> & { accessToken: string; };