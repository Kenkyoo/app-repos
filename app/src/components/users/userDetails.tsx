import * as React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";

interface UserDetailsProps {
  avatar: string;
  name: string;
  login: string;
  bio: string;
  profileUrl: string;
  updated_at: string;
  repos: number;
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

export default function UserDetailsCard({
  avatar,
  name,
  login,
  bio,
  profileUrl,
  updated_at,
  repos,
}: UserDetailsProps) {
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
    <Grid container spacing={2} columns={12}>
      <Grid sx={{ margin: "auto" }} size={{ xs: 12, md: 8 }}>
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
              {updated_at}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <StyledTypography
              variant="body2"
              color="text.secondary"
              gutterBottom
            >
              {bio}
            </StyledTypography>
          </SyledCardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
              }}
            >
              <AvatarGroup max={3}>
                <Avatar
                  alt={name}
                  src={avatar}
                  sx={{ width: 24, height: 24 }}
                />
              </AvatarGroup>
              <Typography variant="caption">{login}</Typography>
            </Box>
            <Typography variant="caption">Repos: {repos}</Typography>
          </Box>
          <Link href={profileUrl}>Ver en github</Link>
        </SyledCard>
      </Grid>
    </Grid>
  );
}
