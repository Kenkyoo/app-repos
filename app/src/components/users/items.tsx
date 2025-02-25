import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import * as React from "react";

interface User {
  id: number;
  avatar: string;
  name: string;
  username: string;
  profileUrl: string;
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

export default function Items({
  id,
  avatar,
  name,
  username,
  profileUrl,
}: User) {
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
    <Grid key={id} size={{ xs: 2, sm: 4, md: 4 }}>
      <SyledCard
        variant="outlined"
        onFocus={() => handleFocus(0)}
        onBlur={handleBlur}
        tabIndex={0}
        className={focusedCardIndex === 0 ? "Mui-focused" : ""}
      >
        <CardMedia
          component="img"
          alt={name}
          image={avatar}
          sx={{
            aspectRatio: "16 / 9",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
        <SyledCardContent>
          <Typography gutterBottom variant="caption" component="div">
            <Link to={`/users/${username}`}>{username}</Link>
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {profileUrl}
          </StyledTypography>
        </SyledCardContent>
      </SyledCard>
    </Grid>
  );
}
