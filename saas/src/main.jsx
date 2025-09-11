import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import Dashboard from "./dashboard";
import ScrollToTop from "./components/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  </Provider>
);
