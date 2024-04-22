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
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import BoyIcon from '@mui/icons-material/Boy';
import GirlIcon from '@mui/icons-material/Girl';

export default function UserList() {
  const [usersList, setUsersList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [delindex, setDelIndex] = React.useState(0);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = (index: number) => {
    setDelIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const users = getUsers();
    users.sort((a:any, b:any) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
    setUsersList(users);
  }, []);

  const handleDeleteUser = () => {
    setOpen(true);
    deleteUser(delindex);
    setUsersList(usersList.filter((user, i) => i !== delindex));
    handleClose();
  };

  return (
    <div className="list">
      <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
        Users
      </Typography>
      <List className="usersList">
        {usersList.map((user: any, index: number) => (
          <ListItem
            className="listName"
            secondaryAction={
              <IconButton
              color="error"
                edge="end"
                aria-label="delete"
                onClick={() => {
                  handleClickOpen(index);
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar {...stringAvatar(user.personal_details.name)}></Avatar>
            </ListItemAvatar>
            <ListItemText
             //primary={user.gender === "Male" ? <BoyIcon /> : <GirlIcon />}
              primary={user.personal_details.name} 
              secondary={
                <React.Fragment>
                  <Typography
                    component="div"
                    variant="body2"
                    color="text.secondary"
                  >
                    {user.personal_details.mobile_number.country_code} {" "} 
                      {user.personal_details.mobile_number.number}
                      
                  </Typography>
                  created on:
                  {user.created_date} {user.personal_details.gender== "Male" ? <BoyIcon /> : <GirlIcon />}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete this user?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancle
          </Button>
          <Button onClick={handleDeleteUser} autoFocus>
            Delete
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
