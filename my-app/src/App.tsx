import SignInSide from './components/SignIn/SignInSide';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpSide from './components/SignUp/SignUpSide';
import WelcomePage from './components/Welcome/Welcome';
import Home from './components/Home/Home';
import { useAppDispatch } from './hooks/redux';
import { getUserRequest } from './store/reducers/userReducer';
import BoardPage from './components/Board/BoardPage';
import { memo } from 'react';

function App() {
  const dispatch = useAppDispatch()  
  dispatch(getUserRequest());
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={WelcomePage}/>
        <Route path="/register" Component={SignUpSide}/>
        <Route path="/login" Component={SignInSide}/>
        <Route path="/home" Component={Home} />
        <Route path="/boards/:boardId" Component={BoardPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default memo(App);
