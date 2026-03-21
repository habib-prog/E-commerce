import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import "./App.css";
import Login from "./Auth/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
