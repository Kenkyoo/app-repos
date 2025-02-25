import Hero from "./components/header/header";
import Search from "./components/search/search";
import { Repos } from "./components/data/repos";
import { Users } from "./components/data/users";
import Repo from "./components/layout/repo";
import User from "./components/users/user";
import Profile from "./auth0/profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navigation/appBar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "./theme/AppTheme";
import Footer from "./components/navigation/footer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <Router>
          <Navbar />
          <Routes>
            <Route path="/repositories" element={<Repos />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/users/:username" element={<User />}></Route>
            <Route path="/repositories/:owner/:repo" element={<Repo />}></Route>
            <Route path="/home" element={<Hero />}></Route>
            <Route path="/" element={<Navigate to="/repositories" />} />
            <Route path="/search" element={<Search />}></Route>
          </Routes>
        </Router>
        <Footer />
      </Container>
    </AppTheme>
  );
}

export default App;
