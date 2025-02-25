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

interface RepoDetailsProps {
  name: string;
  description: string;
  ownerAvatar: string;
  ownerName: string;
  repoUrl: string;
  stargazers_count: string;
  updated_at: string;
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

export default function RepoDetailsCard({
  name,
  description,
  ownerAvatar,
  ownerName,
  repoUrl,
  stargazers_count,
  updated_at,
}: RepoDetailsProps) {
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
            image="https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            sx={{
              aspectRatio: "16 / 9",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          />
          <SyledCardContent>
            <Typography gutterBottom variant="caption" component="div">
              {stargazers_count}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <StyledTypography
              variant="body2"
              color="text.secondary"
              gutterBottom
            >
              {description}
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
                  alt={ownerName}
                  src={ownerAvatar}
                  sx={{ width: 24, height: 24 }}
                />
              </AvatarGroup>
              <Typography variant="caption">{ownerName}</Typography>
            </Box>
            <Typography variant="caption">{updated_at}</Typography>
          </Box>
          <Link href={repoUrl}>Ver en github</Link>
        </SyledCard>
      </Grid>
    </Grid>
  );
}
