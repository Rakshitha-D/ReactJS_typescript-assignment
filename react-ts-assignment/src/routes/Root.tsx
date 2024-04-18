import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";

export default function Root() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/signup");
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
            <Button onClick={handleButtonClick} color="inherit">
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <UserList />
    </div>
  );
}
