import Typography from "@mui/material/Typography";

interface TitleProps {
  titleName: string;
  subtitle: string;
}

const Title: React.FC<TitleProps> = ({ titleName, subtitle }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {titleName}
      </Typography>
      <Typography>{subtitle}</Typography>
    </div>
  );
};

export default Title;
