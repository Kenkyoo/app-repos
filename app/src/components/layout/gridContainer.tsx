import React from "react";
import Grid from "@mui/material/Grid2";

interface ContainerProps {
  children: React.ReactNode;
}

const GridContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 6 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        borderColor: "divider",
      }}
    >
      {children}
    </Grid>
  );
};

export default GridContainer;
