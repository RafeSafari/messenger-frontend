import CircleIcon from '@mui/icons-material/Circle';
import { keyframes, styled, SxProps } from '@mui/material/styles';

const bounce = keyframes`
  0%, 40%, 60%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
`;

const BouncingCircle = styled(CircleIcon)`
  animation: ${bounce} 3s infinite;
`;

const OnlineDot = ({ sx }: { sx?: SxProps }) => {
  return <BouncingCircle color="success" sx={{ width: 8, height: 8, ...sx }} />;
};

export default OnlineDot;