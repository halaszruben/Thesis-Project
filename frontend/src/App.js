import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useLocalState } from './util/useLocalStorage';
import Homepage from './Homepage'
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import WorkerDashboard from './WorkerDashboard';
import WorkerTableView from './WorkerTableView';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <Routes>
      <Route path="/dashboard" element={
        <PrivateRoute>
          <WorkerDashboard />
        </PrivateRoute>
      } />
      <Route path="/tables/:id"
        element={
          <PrivateRoute>
            <WorkerTableView />
          </PrivateRoute>
        } />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
