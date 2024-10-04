import User from "../types/user";

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
}

function UserList({ users, onSelectUser, onDeleteUser }: UserListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">User List</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded"
          >
            <span>{user.nome}</span>
            <div>
              <button
                onClick={() => onSelectUser(user)}
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteUser(user.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
