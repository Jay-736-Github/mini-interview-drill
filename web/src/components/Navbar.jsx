import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAppTheme } from "../context/ThemeContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export default function Navbar() {
  const { user, isLoading } = useAuth();
  const { toggleColorMode } = useAppTheme();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: theme.palette.mode === "dark" ? "#1e1e1e" : "#fefefe",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
        <Typography
          variant="h5"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            fontFamily: "Georgia, serif",
            fontWeight: 600,
            color: theme.palette.mode === "dark" ? "#fff" : "#111",
          }}
        >
          Upivot - Let's Transform Your Career
        </Typography>
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <motion.div whileHover={{ scale: 1.1 }}>
            <IconButton
              sx={{
                ml: 1,
                color: theme.palette.mode === "light" ? "#1976d2" : "#f5f5f5",
                transition: "color 0.3s",
                "&:hover": {
                  color: theme.palette.mode === "light" ? "#115293" : "#fff",
                },
              }}
              onClick={toggleColorMode}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </motion.div>

          {!isLoading && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {user ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {["/dashboard", "/history"].map((path) => {
                      const label =
                        path === "/dashboard" ? "Dashboard" : "History";
                      return (
                        <Box
                          key={path}
                          component={RouterLink}
                          to={path}
                          sx={{
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            backgroundColor:
                              theme.palette.mode === "light"
                                ? "#f5f5f5"
                                : "#2c2c2c",
                            color:
                              theme.palette.mode === "light" ? "#111" : "#fff",
                            fontWeight: 500,
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.3s",
                            "&:hover": {
                              backgroundColor:
                                theme.palette.mode === "light"
                                  ? "#e0e0e0"
                                  : "#3a3a3a",
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          {label}
                        </Box>
                      );
                    })}
                  </Box>

                  <IconButton
                    onClick={handleMenu}
                    size="small"
                    sx={{
                      border: "2px solid rgba(0,0,0,0.1)",
                      "&:hover": { borderColor: theme.palette.primary.main },
                      borderRadius: "50%",
                    }}
                  >
                    <Avatar
                      alt={user.name}
                      src={user.picture}
                      sx={{ width: 36, height: 36 }}
                    />
                  </IconButton>
     
                  <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      elevation: 3,
                      sx: { mt: 1, minWidth: 180, borderRadius: 2 },
                    }}
                  >
                    <MenuItem disabled sx={{ fontWeight: 600 }}>
                      {user.name}
                    </MenuItem>
                    <MenuItem
                      component="a"
                      href={`${API_BASE_URL}/auth/logout`}
                      sx={{ color: theme.palette.error.main }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Box
                    component="a"
                    href={`${API_BASE_URL}/auth/google`}
                    sx={{
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      backgroundColor: theme.palette.primary.main,
                      color: "#fff",
                      fontWeight: 600,
                      textDecoration: "none",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    Sign-In / Log-In with Google
                  </Box>
                </motion.div>
              )}
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}