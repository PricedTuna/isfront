import React from 'react'
import { UserService } from '../../../../services/UserService'
import { UserDto } from '../../../../dtos/user/User';

function useGetUsers() {
  const _userService = new UserService();

  const getUsers = async () => {
    const usersDto = await _userService.getAll(); // *
    return [] as UserDto[]; // todo: hacer el maper
  } 

  return {getUsers}
}

export default useGetUsers
