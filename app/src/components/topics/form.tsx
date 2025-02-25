import * as React from "react";
import { Chip, Box } from "@mui/material";

interface FormTopicsProps {
  setTopic: (topic: string) => void;
}

const topics = [
  "Angular",
  "jQuery",
  "JavaScript",
  "React",
  "Vue",
  "Svelte",
  "Redux",
  "Html",
  "Css",
];

export const FormTopics: React.FC<FormTopicsProps> = ({ setTopic }) => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        gap: 3,
        overflow: "auto",
      }}
    >
      {topics.map((topic, index) => (
        <Chip
          key={index}
          label={topic}
          onClick={() => setTopic(topic.toLowerCase())} // Actualiza el estado con el topic seleccionado
          size="medium"
          sx={{
            backgroundColor: "transparent",
            border: "none",
          }}
        />
      ))}
    </Box>
  );
};
