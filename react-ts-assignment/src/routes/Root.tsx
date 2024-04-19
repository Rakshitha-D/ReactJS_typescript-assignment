import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";
import { IconButton } from "@mui/material";

export default function Root() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/signup");
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
            <Button
              onClick={handleButtonClick}
              color="primary"
              variant="contained"
            >
              Create User
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <UserList />
    </div>
  );
}
