import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Home from "./pages/Home";
import UsersPage from "./pages/Users";
import Books from "./pages/Books";
import Courses from "./pages/Course";
import ResearchProjects from "./pages/ResearchProjects";
import Podcasts from "./pages/Podcast";
import AdminPositions from "./pages/AdminPositions";
import Workshops from "./pages/Workshops";
import Journals from "./pages/Journals";
import Chapters from "./pages/Chapters";

import Layout from "./components/Layout";
import Subscribers from "./pages/Subscribers";
import Testimonials from "./pages/Testimonials";
import Students from "./pages/Students";

const isAuthenticated = () => !!localStorage.getItem("token");

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

// localStorage.clear()

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
   
        <Route path="/" element={isAuthenticated() ? <Navigate to="/users" /> : <Login />} />

        <Route
          path="/home"
          element={<PrivateRoute><Layout><Home /></Layout></PrivateRoute>}
        />
        <Route
          path="/users"
          element={<PrivateRoute><Layout><UsersPage /></Layout></PrivateRoute>}
        />
        <Route
          path="/books"
          element={<PrivateRoute><Layout><Books /></Layout></PrivateRoute>}
        />
        <Route
          path="/course"
          element={<PrivateRoute><Layout><Courses /></Layout></PrivateRoute>}
        />
        <Route
          path="/research"
          element={<PrivateRoute><Layout><ResearchProjects /></Layout></PrivateRoute>}
        />
        <Route
          path="/podcast"
          element={<PrivateRoute><Layout><Podcasts /></Layout></PrivateRoute>}
        />
        <Route
          path="/admin-positions"
          element={<PrivateRoute><Layout><AdminPositions /></Layout></PrivateRoute>}
        />
        <Route
          path="/workshops"
          element={<PrivateRoute><Layout><Workshops /></Layout></PrivateRoute>}
        />
        <Route
          path="/journals"
          element={<PrivateRoute><Layout><Journals /></Layout></PrivateRoute>}
        />
        <Route
          path="/chapters"
          element={<PrivateRoute><Layout><Chapters /></Layout></PrivateRoute>}
        />
        <Route
          path="/subscribers"
          element={<PrivateRoute><Layout><Subscribers /></Layout></PrivateRoute>}
        />
        <Route
          path="/testimonials"
          element={<PrivateRoute><Layout><Testimonials /></Layout></PrivateRoute>}
        />
        <Route
          path="/students"
          element={<PrivateRoute><Layout><Students/></Layout></PrivateRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
