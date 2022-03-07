import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CoinList from "./pages/CoinList";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import CoinDetail from "./pages/CoinDetail";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CoinList" element={<CoinList />} />
        <Route path="/CoinList/:id" element={<CoinDetail />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
