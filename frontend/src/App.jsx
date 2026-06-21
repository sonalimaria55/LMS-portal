import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/common/LandingPage";
import Home from "./pages/common/Home";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TrainerDashboard from "./pages/trainer/TrainerDahboard";
import AdminLayout from "./pages/admin/AdminLayout";
import ManageTrainers from "./pages/admin/ManageTrainers";
import AddTrainer from "./pages/admin/AddTrainer"

function App() {
  return (
    <Routes>
      {/*public routes */}
      <Route path="/" element={<LandingPage />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>




      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={<AdminLayout />}
      >
        <Route index element={<AdminDashboard />} />
        <Route path="/admin/dashboard/manageTrainers" element={<ManageTrainers />} />
        <Route path="/admin/dashboard/addTrainer"  element={<AddTrainer/>} />



      </Route>


      {/* Trainer Routes */}
      <Route
        path="/trainer/dashboard"
        element={<TrainerDashboard />}
      />

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={<StudentDashboard />}
      />

    </Routes>

  );
}

export default App;