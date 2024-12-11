import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashBoard";

// Simulated authentication function (replace with actual authentication logic)
const isAuthenticated = () => {
  // Here you can check for a token or user session.
  console.log(localStorage.getItem("user"))
  return localStorage.getItem("user") !== null;
};

// Protected Route Component
function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Wrap the Dashboard route with ProtectedRoute */}
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
