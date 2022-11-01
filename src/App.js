import { useSelector } from 'react-redux';
import LoginPage from './pages/loginPage';
import { selectUser } from './features/userSlice'
import styled from 'styled-components';
import Navbar from './components/navbar';

const AppContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  text-align: center;
`

function App() {
  const user = useSelector(selectUser);

  return (
    <AppContainer>
      <Navbar />
      {user ? <h1>Welcome {user.name}</h1> : <LoginPage />}
    </AppContainer>
  );
}

export default App;
