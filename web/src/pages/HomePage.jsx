import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FloatingIcons from "../components/FloatingIcons";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box sx={{ position: "relative", overflow: "hidden", minHeight: "90vh" }}>
      <FloatingIcons />
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            textAlign: "center",
          }}
        >
          <Stack spacing={4} alignItems="center">
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              sx={{ fontFamily: "Georgia, serif" }}
            >
              Master Your Tech Interviews
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontFamily: "Georgia, serif" }}
            >
              Practice with AI-powered drills, track your progress, and land
              your dream job.
            </Typography>
            <Button
              variant="contained"
              size="large"
              href={`${API_BASE_URL}/auth/google`}
              sx={{ mt: 4, py: 2, px: 4, fontSize: "1.2rem" }}
            >
              Sign-In / Log-In with Google
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
