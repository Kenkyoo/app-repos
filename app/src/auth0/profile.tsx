import { useAuth0 } from "@auth0/auth0-react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Chip } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <p>No has iniciado sesión</p>;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={user?.picture}
        alt={user?.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {user?.nickname}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {user?.updated_at}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {user?.email_verified ? (
          <Chip label="Email Verified" color="success" />
        ) : (
          <Chip label="Unverified Email" color="error" />
        )}
      </CardActions>
    </Card>
  );
}
