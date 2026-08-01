import UserTable from "@/components/admin/UserTable";
import { IUser } from "@/lib/types/admin";
import { getUsers } from "@/services/admin/get-users";

const UsersPage = async () => {
  const response = await getUsers();

  const users: IUser[] = response?.data ?? [];

  return (
    <div className="space-y-6 w-full">
      <h1 className="text-3xl font-bold">User Management</h1>

      <UserTable users={users} />
    </div>
  );
};

export default UsersPage;
