import { useLocation, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import FloatingIcons from "./FloatingIcons";

export default function Layout() {
  const location = useLocation();
  const showFloatingIcons = ["/", "/dashboard"].includes(location.pathname);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative", 
      }}
    >
      {showFloatingIcons && <FloatingIcons />}
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          position: "relative", 
          zIndex: 1,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
