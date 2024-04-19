import { useState, useEffect } from "react";
import { deleteUser, getUsers } from "./LocalStorage";
import {
  Avatar,
  IconButton,
  List,
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

  const handleDeleteUser = (index: number) => {
    deleteUser(index);
    setUsersList(usersList.filter((user, i) => i !== index));
  };
  return (
    <div className="list">
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Users
      </Typography>
      <List className="usersList">
        {usersList.map((user: any, index: number) => (
          <ListItem
            className="listName"
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  handleDeleteUser(index);
                }}
              >
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
      </List>
    </div>
  );
}
