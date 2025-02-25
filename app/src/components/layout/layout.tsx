import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface HighlightsProps {
  repo: string;
  id: string;
  icon: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  owner: string;
  full_name: string;
}

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export default function Latest({
  repo,
  id,
  icon,
  description,
  stargazers_count,
  owner,
}: HighlightsProps) {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <Grid key={id} size={{ xs: 12, md: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
        }}
      >
        <SyledCard
          variant="outlined"
          onFocus={() => handleFocus(3)}
          onBlur={handleBlur}
          tabIndex={0}
          className={focusedCardIndex === 3 ? "Mui-focused" : ""}
          sx={{ height: "100%", p: 4 }}
        >
          <SyledCardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div>
              <Link to={`/repositories/${owner}/${repo}`}>
                <Typography gutterBottom variant="caption" component="div">
                  {stargazers_count}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {repo}
                </Typography>
              </Link>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {description}
              </StyledTypography>
            </div>
          </SyledCardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
              p: 2,
            }}
          >
            <AvatarGroup max={3}>
              <Avatar
                key={id}
                alt={owner}
                src={icon}
                sx={{ width: 24, height: 24 }}
              />
            </AvatarGroup>
            <Typography variant="caption">{repo}</Typography>
          </Box>
        </SyledCard>
      </Box>
    </Grid>
  );
}
