
import { UserService } from '../../../../services/UserService'
import { UserDto } from '../../../../dtos/user/User';
import { useState } from 'react';

function useGetUsers() {
  const _userService = new UserService();
  const [users,setUsers] = useState<UserDto[]>([])

 
  const fetchUsers = async () => {
    try {
      const response = await _userService.getAll();
      if (Array.isArray(response)) {
        setUsers(response);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return {users, fetchUsers}
}


export default useGetUsers
