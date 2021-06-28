import { Home } from 'pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Room } from 'pages/Room';
import { NewRoom } from 'pages/NewRoom';
import { AdminRoom } from 'pages/AdminRoom';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} />
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
