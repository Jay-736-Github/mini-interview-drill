import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Button,
  CardActions,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from "@mui/material";

const difficultyColors = {
  Easy: "success",
  Medium: "warning",
  Hard: "error",
};

export default function DrillCard({ drill }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    drill.difficulty
  );
  const handleDifficultyChange = (event, newDifficulty) => {
    if (newDifficulty !== null) {
      setSelectedDifficulty(newDifficulty);
    }
  };
  return (
    <Card
      sx={{
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, padding: 0 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {drill.title}
        </Typography>
        <ToggleButtonGroup
          value={selectedDifficulty}
          exclusive
          onChange={handleDifficultyChange}
          size="small"
          fullWidth
          sx={{ mb: 2 }}
        >
          {["Easy", "Medium", "Hard"].map((level) => (
            <ToggleButton
              key={level}
              value={level}
              color={difficultyColors[level]}
            >
              {level}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 2 }}>
          {drill.tags?.map((tag) => (
            <Chip key={tag} label={tag} variant="outlined" size="medium" />
          ))}
        </Stack>
        <Typography variant="body1" color="text.secondary">
          {drill.description || "Here are some sample questions for the drill"}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", p: 2 }}>
        <Button
          component={RouterLink}
          to={`/drill/${drill._id}`}
          variant="contained"
          size="large"
          fullWidth
        >
          Start Drill
        </Button>
      </CardActions>
    </Card>
  );
}
