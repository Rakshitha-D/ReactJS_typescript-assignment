import { useState, useEffect } from "react";
import { getUsers } from "./LocalStorage";

export default function UserList() {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    const users = getUsers();
    setUsersList(usersList);
  }, []);
  return (
    <div>
      <ul>
        {usersList.map((user: any) => (
          <li>{user.personal_details.name}</li>
        ))}
      </ul>
    </div>
  );
}
