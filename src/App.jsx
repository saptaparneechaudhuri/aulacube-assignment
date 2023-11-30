import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Input from "./components/input/Input";
import List from "./pages/list/List";

const App = () => {
  return (
    <main className="main-container">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Input />} />
          <Route path="/list" element={<List />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
