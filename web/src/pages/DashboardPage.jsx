import { useState, useEffect } from "react";
import api from "../services/api.js";
import DrillCard from "../components/DrillCard";
import FloatingIcons from "../components/FloatingIcons"; 
import {
  Container,
  Typography,
  Grid,
  Alert,
  Skeleton,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [drills, setDrills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrills = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/drills");
        setDrills(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch drills. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDrills();
  }, []);

  if (error)
    return (
      <Alert severity="error" sx={{ m: 3 }}>
        {error}
      </Alert>
    );

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <FloatingIcons />
      <Container
        maxWidth="xl"
        sx={{ py: 6, position: "relative", zIndex: 1 }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ fontFamily: "Georgia, serif" }}
        >
          Dashboard
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 5 }}
        >
          Select a drill and start practicing
        </Typography>

        <Grid container spacing={4}>
          {isLoading
            ? Array.from(new Array(3)).map((_, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Skeleton
                    variant="rounded"
                    height={250}
                    sx={{ borderRadius: 3 }}
                  />
                </Grid>
              ))
            : drills.map((drill, index) => (
                <Grid item xs={12} sm={4} key={drill._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    style={{ height: "100%" }}
                  >
                    <DrillCard drill={drill} />
                  </motion.div>
                </Grid>
              ))}
        </Grid>
      </Container>
    </Box>
  );
}
