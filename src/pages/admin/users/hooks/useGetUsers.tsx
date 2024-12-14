import { useState, useCallback,useMemo } from "react";
import { UserDto } from "../../../../dtos/user/User";
import { UserService } from "../../../../services/UserService";

const useGetUsers = () => {
  const [users, setUsers] = useState<UserDto[] | undefined>(undefined);


  const _userService = useMemo(() => new UserService(), []);
  

  // Memoriza fetchUsers para evitar que cambie entre renders
  const fetchUsers = useCallback(async () => {
    try {
      const result = await _userService.getAll();
      if (result && Array.isArray(result)) {
        setUsers(result as UserDto[]); // Aseguramos que el tipo sea UserDto[]
      } else {
        setUsers(undefined); // En caso de error o datos inválidos
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers(undefined); // Limpia el estado en caso de error
    }
  }, [_userService]);
  

  return { users, fetchUsers };
};

export default useGetUsers;
