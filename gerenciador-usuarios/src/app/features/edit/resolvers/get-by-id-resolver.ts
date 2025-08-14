import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { User } from '../../../shared/interface/usuario';
import { Users } from '../../../shared/services/users';


export const getByIdResolver: ResolveFn<User> = (route, state) => {
  const userService = inject(Users);
  const id = route.paramMap.get('id')!;
  return userService.getById(id)
};
