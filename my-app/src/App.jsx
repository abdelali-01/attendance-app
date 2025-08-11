import { useEffect} from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import Login from "./pages/login/Login";
import ResetPass from "./pages/ResetPass";
import Signup from "./pages/signup/Signup";
import Verification from "./pages/Verification";

import { useDispatch } from "react-redux";
import { checkUser } from "./store/auth/authHandler";
import Navbar from "./components/website/Navbar";
import Home from "./pages/website/Home";
import Pricing from "./pages/website/Pricing";
import Subscribe from "./pages/website/Subscribe";
import ToastContainer from "./components/Toast/ToastContainer";
import CheckoutRedirecter from "./components/modals/ChekoutRedirecter";
import ToastTest from "./pages/ToastTest";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const dispatch = useDispatch();

  // create state to put the classes in
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUser(navigate));
  },[]);

  return (
    <ToastContainer>
      <ScrollToTop />
      <CheckoutRedirecter />
      <div className="App">
          <Navbar/>
            <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Pricing" element={<Pricing/>} />
            <Route path="/subscribe" element={<Subscribe/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/verification/:token" element={<Verification />} />
            <Route path="/reset-pass" element={<ResetPass />} />
            <Route
              path="/reset-pass/:token"
              element={<ResetPass resetPassword />}
            />
            <Route path="/toast-test" element={<ToastTest />} />
          </Routes>
          
      </div>
    </ToastContainer>
  );
}

export default App;
