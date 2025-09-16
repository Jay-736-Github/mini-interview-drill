import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import { motion, AnimatePresence } from "framer-motion";

import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  TextField,
  Button,
  Stack,
  Paper,
} from "@mui/material";

export default function DrillPage() {
  const { id: drillId } = useParams();
  const [drill, setDrill] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [feedbackType, setFeedbackType] = useState("success");

  useEffect(() => {
    const fetchDrill = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/api/drills/${drillId}`);
        setDrill(response.data);
      } catch (err) {
        setError("Failed to load the drill.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDrill();
  }, [drillId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formattedAnswers = Object.keys(answers).map((qid) => ({
        qid,
        text: answers[qid] || "",
      }));

      const response = await api.post("/api/attempts", {
        drillId,
        answers: formattedAnswers,
      });

      setFeedbackType("success");
      setFeedbackMessage(
        `Your attempt Submitted! Your score is: ${response.data.score}%`
      );
      setIsSubmitted(true);

      setTimeout(() => setFeedbackMessage(null), 4000);
    } catch (err) {
      setFeedbackType("error");
      setFeedbackMessage("❌ Failed to submit your attempt. Please try again.");
      setTimeout(() => setFeedbackMessage(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress size={36} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 3, fontSize: "1rem" }}>
        {error}
      </Alert>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontFamily: "Georgia, serif", fontWeight: 700, mb: 6 }}
        >
          {drill?.title}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={5}>
            {drill?.questions.map((q, index) => (
              <Paper
                key={q.id}
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 14px 28px rgba(0,0,0,0.15)",
                  },
                  borderLeft: "6px solid #1976d2",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 2, fontSize: "1.15rem" }}
                >
                  {`${index + 1}. ${q.prompt}`}
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  variant="outlined"
                  placeholder="Write your answer here..."
                  value={answers[q.id] || ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  disabled={isSubmitted}
                  sx={{
                    backgroundColor: "background.paper",
                    borderRadius: 2,
                  }}
                />
              </Paper>
            ))}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color={isSubmitted ? "success" : "primary"}
                size="large"
                disabled={isSubmitting || isSubmitted}
                sx={{
                  minWidth: 220,
                  fontSize: "1.2rem",
                  py: 1.5,
                  borderRadius: 3,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
                  "&:hover": {
                    boxShadow: "0 10px 24px rgba(0,0,0,0.25)",
                  },
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={28} color="inherit" />
                ) : isSubmitted ? (
                  "Submitted"
                ) : (
                  "Submit Answers"
                )}
              </Button>
              
              <AnimatePresence>
                {feedbackMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.4 }}
                    style={{ width: "100%", maxWidth: 500, marginTop: "1rem" }}
                  >
                    <Alert severity={feedbackType}>{feedbackMessage}</Alert>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Stack>
        </Box>
      </motion.div>
    </Container>
  );
}
