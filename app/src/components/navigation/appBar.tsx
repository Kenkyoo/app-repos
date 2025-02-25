import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: theme
    ? `rgba(${theme.palette.background} / 0.4)`
    : alpha(theme, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Link to={"/repositories"}>
                <Button variant="text" color="info" size="small">
                  Repositories
                </Button>
              </Link>
              <Link to={"/users"}>
                <Button variant="text" color="info" size="small">
                  Users
                </Button>
              </Link>
              <Link to={"/search"}>
                <Button variant="text" color="info" size="small">
                  Search
                </Button>
              </Link>
              <Link to={"/profile"}>
                <Button variant="text" color="info" size="small">
                  Profile
                </Button>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {isAuthenticated && user ? (
              <Link to={"/profile"}>
                <Avatar alt={user.name} src={user.picture} />
              </Link>
            ) : (
              <Avatar />
            )}
            {!isAuthenticated ? (
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={() => loginWithRedirect()}
              >
                Iniciar Sesión
              </Button>
            ) : (
              <Button
                color="primary"
                variant="outlined"
                fullWidth
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                // ✅ Ahora es una función
              >
                Salir
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {isAuthenticated && user ? (
                    <IconButton sx={{ p: 0 }}>
                      <Avatar alt={user.name} src={user.picture} />
                    </IconButton>
                  ) : (
                    <IconButton sx={{ p: 0 }}>
                      <Avatar />
                    </IconButton>
                  )}
                </Box>
                <MenuItem>
                  <Link to={"/repositories"}>Repositories</Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link to={"/users"}>Users</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={"/search"}>Search</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={"/profile"}>Profile</Link>
                </MenuItem>
                <Divider sx={{ my: 3 }} />
                {isAuthenticated && user ? (
                  <MenuItem>
                    <Avatar alt={user.name} src={user.picture} />
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Avatar />
                  </MenuItem>
                )}
                <MenuItem>
                  {!isAuthenticated ? (
                    <>
                      <MenuItem>
                        <Avatar />
                      </MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={() => loginWithRedirect()}
                      >
                        Iniciar Sesión
                      </Button>
                    </>
                  ) : (
                    <Button
                      color="primary"
                      variant="outlined"
                      fullWidth
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      } // ✅ Ahora es una función
                    >
                      Salir
                    </Button>
                  )}
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
