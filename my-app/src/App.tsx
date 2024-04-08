import SignInSide from './components/SignIn/SignInSide';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpSide from './components/SignUp/SignUpSide';
import Welcome from './components/Welcome/Welcome';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Welcome}/>
        <Route path="/register" Component={SignUpSide}/>
        <Route path="/login" Component={SignInSide}/>
        <Route path="/home" Component={Home}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
