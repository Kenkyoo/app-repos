import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Box from "@mui/material/Box";

interface FormProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const Form: React.FC<FormProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        flexDirection: "row",
        gap: 1,
        width: { xs: "100%", md: "fit-content" },
        overflow: "auto",
        marginBottom: 2,
        marginTop: 2,
      }}
    >
      <FormControl
        sx={{ width: { xs: "100%", md: "100%" } }}
        variant="outlined"
      >
        <OutlinedInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          id="search"
          placeholder="Search…"
          sx={{ flexGrow: 1 }}
          startAdornment={
            <InputAdornment position="start" sx={{ color: "text.primary" }}>
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          }
          inputProps={{
            "aria-label": "search",
          }}
        />
      </FormControl>
    </Box>
  );
};
