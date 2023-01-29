import { Typography } from '@mui/material';
import './App.css';
import Ballot from './Components/Ballot/Ballot';

function App() {
  // Feel free to remove the contents of the header tag to make more room for your code
  return (
    <div className="App">
      <Typography variant='h3' component="h3">
        Awards 2023
      </Typography>
      <Ballot />
    </div>
  );
}

export default App;
