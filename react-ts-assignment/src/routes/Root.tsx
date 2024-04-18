import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
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
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h4" component="h4" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
            <Button onClick={handleButtonClick} color="success"  variant="contained">
             Create User
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <UserList />   
      {/*<SignUpForm />*/}
    </div>
  );
}
