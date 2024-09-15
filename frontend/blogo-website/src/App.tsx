import './App.css';
import SignUp from './components/SignUpForm';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ProtectedComponent from './protected/protected';
import Dashboard from './protected/Dashboard';
import Profile from './protected/profile';
import CreatePost from './protected/createPost';
import EditPost from './protected/EditPost';


function App() {

  return (
  <div className="App">
    <BrowserRouter>
    <Routes>

      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/dashboard' element={ <ProtectedComponent> <Dashboard /> </ProtectedComponent> } />
      <Route path='/profile' element={ <ProtectedComponent> <Profile /> </ProtectedComponent> } />
      <Route path="/profile/updatepost" element={<EditPost />} />
      <Route path='/createpost' element={ <ProtectedComponent> <CreatePost /> </ProtectedComponent> } />
      
    </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
