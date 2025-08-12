export interface User {
  name: string;
  id: number;
}

export type UserPayload = Omit<User, 'id'>;