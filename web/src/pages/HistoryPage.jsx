import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import api from "../services/api.js";
import { motion } from "framer-motion";

import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Button,
  Stack,
  LinearProgress,
} from "@mui/material";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function HistoryPage() {
  const [attempts, setAttempts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/attempts");
        setAttempts(response.data);
      } catch (err) {
        setError("Failed to fetch your history.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Alert severity="error" sx={{ m: 3 }}>
        {error}
      </Alert>
    );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 4, fontFamily: "Georgia, serif" }}
      >
        My Score
      </Typography>

      {attempts.length === 0 ? (
        <Paper elevation={4} sx={{ textAlign: "center", p: 6, mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            You haven't taken any drills yet.
          </Typography>
          <Button
            component={RouterLink}
            to="/dashboard"
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
          >
            Find a Drill to Start
          </Button>
        </Paper>
      ) : (
        <Stack
          spacing={3}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {attempts.map((attempt) => {
            const scoreColor =
              attempt.score >= 80
                ? "success.main"
                : attempt.score >= 50
                ? "warning.main"
                : "error.main";

            return (
              <Paper
                key={attempt._id}
                component={motion.div}
                variants={itemVariants}
                elevation={6}
                whileHover={{ scale: 1.02 }}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  background: (theme) =>
                    theme.palette.mode === "light" ? "#fff" : "#1e1e1e",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    Score: {attempt.score}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(attempt.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={attempt.score}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    "& .MuiLinearProgress-bar": { backgroundColor: scoreColor },
                  }}
                />
              </Paper>
            );
          })}
        </Stack>
      )}
    </Container>
  );
}
