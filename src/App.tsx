import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import UsersPage from "./pages/Users";
import Books from "./pages/Books";
import Courses from "./pages/Course";
import ResearchProjects from "./pages/ResearchProjects";
import Podcasts from "./pages/Podcast";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      {isAuthenticated() && <Sidebar />}
      <Routes>
        {/* Login route (public) */}
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate to="/users" /> : <Login />
          }
        />

        {/* Private routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/books"
          element={
            <PrivateRoute>
              <Books />
            </PrivateRoute>
          }
        />
        <Route
          path="/course"
          element={
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          }
        />
        <Route
          path="/research"
          element={
            <PrivateRoute>
              <ResearchProjects />
            </PrivateRoute>
          }
        />
        <Route
          path="/podcast"
          element={
            <PrivateRoute>
              <Podcasts />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
