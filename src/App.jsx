// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import CustomAppBar from "./components/AppBar";
import AddNewShop from "./pages/AddNewShop";
import HomePage from "./pages/HomePage";
import RandomPicker from "./pages/RandomPicker";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <Router>
      <CustomAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddNewShop />} />
        <Route path="/pick" element={<RandomPicker />} />
        <Route path="/n/:id" element={<EditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
