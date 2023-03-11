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
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';
import CustomerDashboard from './CustomerDashboard';
import CustomerTableView from './CustomerTableView';
import { useUser } from './UserProvider';
import RegisterWorker from './RegisterWorker';
import RegisterCustomer from './RegisterCustomer';

function App() {
  const user = useUser();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setRoles(getRolesFromJwt());
  }, [user.jwt])

  function getRolesFromJwt() {
    if (user.jwt) {
      const decodedJwt = jwt_decode(user.jwt);
      return decodedJwt.authorities;
    }
    return [];
  }

  return (

    <Routes>
      <Route path="/dashboard" element={
        roles.find((role) => role === "ROLE_WORKER") ? (
          <PrivateRoute>
            <WorkerDashboard />
          </PrivateRoute>
        ) : (
          < PrivateRoute >
            <CustomerDashboard />
          </PrivateRoute>
        )
      }

      />
      < Route path="/tables/:tableId"
        element={
          roles.find((role) => role === "ROLE_WORKER") ? (
            < PrivateRoute >
              <WorkerTableView />
            </PrivateRoute >
          ) : (
            <PrivateRoute>
              <CustomerTableView />
            </PrivateRoute>
          )
        }
      />

      < Route path="/login" element={< Login />} />

      < Route path="/" element={< Homepage />} />

      <Route path="/registerWorker" element={< RegisterWorker />} />

      <Route path="/registerCustomer" element={< RegisterCustomer />} />

    </Routes >
  );
}

export default App;
