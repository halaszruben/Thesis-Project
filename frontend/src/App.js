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
import { useState } from 'react';
import CustomerDashboard from './CustomerDashboard';
import CustomerTableView from './CustomerTableView';

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState(getRolesFromJwt());

  console.log(roles);
  function getRolesFromJwt() {
    if (jwt) {
      const decodedJwt = jwt_decode(jwt);
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
      < Route path="/tables/:id"
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

    </Routes >
  );
}

export default App;
