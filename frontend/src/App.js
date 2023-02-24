
import { useEffect } from 'react';
import './App.css';
import { useLocalState } from './util/useLocalStorage';

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  useEffect(() => {
    if (!jwt) {
      const reqBody = {
        username: "trevor",
        password: "asdfasdf",
      };

      fetch("api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify(reqBody),
      })
        .then((response) => Promise.all([response.json(), response.headers]))
        .then(([body, headers]) => {
          setJwt(headers.get("authorization"));
        });
    }
  }, []);

  useEffect(() => {
    console.log(`JWT is: ${jwt}`);
  }, [jwt]);

  return (
    <div className="App">
      <h1>HELLO</h1>
    </div>
  );
}

export default App;
