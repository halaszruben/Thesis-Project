
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useLocalState } from './util/useLocalStorage';
import Dashboard from './Dashboard'
import Homepage from './Homepage'
import Login from './Login';
import PrivateRoute from './PrivateRoute';

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  // useEffect(() => {
  //   if (!jwt) {
  //     const reqBody = {
  //       username: "trevor",
  //       password: "asdfasdf",
  //     };

  //     fetch("api/auth/login", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "post",
  //       body: JSON.stringify(reqBody),
  //     })
  //       .then((response) => Promise.all([response.json(), response.headers]))
  //       .then(([body, headers]) => {
  //         setJwt(headers.get("authorization"));
  //       });
  //   }
  // }, []);

  useEffect(() => {
    console.log(`JWT is: ${jwt}`);
  }, [jwt]);

  return (
    <Routes>
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
