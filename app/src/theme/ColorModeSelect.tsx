import { useColorScheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";

/**
 * A component that renders a select dropdown for choosing the color mode.
 * It allows the user to switch between 'system', 'light', and 'dark' modes.
 *
 * @param props - The properties passed to the Select component.
 * @returns A Select component with options for color modes or null if the mode is not available.
 *
 * @ts-expect-error 'data-screenshot' is not a recognized property of SelectDisplayProps, but it is used for testing purposes.
 */
export default function ColorModeSelect(props: SelectProps) {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Select
      value={mode}
      onChange={(event) =>
        setMode(event.target.value as "system" | "light" | "dark")
      }
      data-screenshot="toggle-mode"
      {...props}
    >
      <MenuItem value="system">System</MenuItem>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}
