import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SecondPage from './SecondPage';
import Form from "./components/Login/Form"
import { useState } from 'react';

function App() {

  const [authorized, setAuthorized] = useState(false)

  function isAuthorized() {
    setAuthorized(true);
  }


  return (
    <Router>
      <Routes >
        <Route exact path="/" element={<Form authorize={() => isAuthorized()} />} />
        <Route path="/secondpage/:username/:id" element={<SecondPage authorize={authorized} />} />
      </Routes >
    </Router>
  )
}

export default App;
