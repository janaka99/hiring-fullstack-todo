import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ViewTodo from "./pages/view-todo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<ViewTodo />} />
    </Routes>
  );
}

export default App;
