import SignInSide from './components/SignIn/SignInSide';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpSide from './components/SignUp/SignUpSide';
import WelcomePage from './components/Welcome/Welcome';
import Home from './components/Home/Home';
import { useAppDispatch } from './hooks/redux';
import { getUserRequest } from './store/reducers/userReducer';

function App() {
  const dispatch = useAppDispatch()  
  dispatch(getUserRequest());
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={WelcomePage}/>
        <Route path="/register" Component={SignUpSide}/>
        <Route path="/login" Component={SignInSide}/>
        <Route path="/home" Component={Home}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
