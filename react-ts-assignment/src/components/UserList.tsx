import { useState, useEffect } from "react";
import { getUsers } from "./LocalStorage";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./UserList.css";
import { stringAvatar } from "./AvatarFunctions";

export default function UserList() {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    const users = getUsers();
    setUsersList(users);
  }, []);
  return (
    <div className="usersList">
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        List of Registered Users
      </Typography>
      {usersList.map((user: any) => (
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar {...stringAvatar(user.personal_details.name)}></Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.personal_details.name} />
        </ListItem>
      ))}
    </div>
  );
}
