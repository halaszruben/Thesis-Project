import { Route, Routes } from 'react-router-dom';
import './App.css';
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
import ManagerDashboard from './ManagerDashboard';
import ManagerBookstoreView from './ManagerBookstoreView';

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
          < PrivateRoute >
            <CustomerDashboard />
          </PrivateRoute>

        ) : roles.find((role) => role === "ROLE_MANAGER") ? (
          <PrivateRoute>
            < ManagerDashboard />
          </PrivateRoute>
        ) : (
          <PrivateRoute>
            <WorkerDashboard />
          </PrivateRoute>
        )
      }
      />

      <Route path='/tables'
        element={
          roles.find((role) => role === "ROLE_MANAGER") ? (
            <PrivateRoute>
              < WorkerDashboard />
            </PrivateRoute>
          ) : (
            <></>
          )
        } />

      < Route path="/tables/:tableId"
        element={
          roles.find((role) => role === "ROLE_WORKER" || role === "ROLE_MANAGER") ? (
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

      <Route path="/bookstores/:bookstoreId" element={
        roles.find((role) => role === "ROLE_WORKER") ? (
          <></>
        ) : roles.find((role) => role === "ROLE_MANAGER") ? (
          <PrivateRoute>
            < ManagerBookstoreView />
          </PrivateRoute>
        ) : (
          <></>
        )
      }
      />

      < Route path="/login" element={< Login />} />

      < Route path="/" element={< Homepage />} />

      <Route path="/registerWorker" element={< RegisterWorker />} />

      <Route path="/registerCustomer" element={< RegisterCustomer />} />

      <Route path="/bookstores"
        element={
          roles.find((role) => role === "ROLE_MANAGER") ? (
            <PrivateRoute>

            </PrivateRoute>
          ) : (
            <></>
          )
        }
      />

      <Route path="/bookstores/:id"
        element={
          roles.find((role) => role === "ROLE_MANAGER") ? (
            <PrivateRoute>

            </PrivateRoute>
          ) : (
            <></>
          )
        }
      />

    </Routes >
  );
}

export default App;
