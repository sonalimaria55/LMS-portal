import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/common/LandingPage";
import Home from "./pages/common/Home";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import ManageTrainers from "./pages/admin/ManageTrainers";
import AddTrainer from "./pages/admin/AddTrainer"
import AdminEditTrainer from "./pages/admin/AdminEditTrainer";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminManageStudents from "./pages/admin/AdminManageStudents";
import ManageCourses from "./pages/trainer/ManageCourses";
import AddCourse from "./pages/trainer/AddCourse";
import EditCourse from "./pages/trainer/EditCourse";
import TrainerCourseTopic from "./pages/trainer/TrainerCourseTopic";
import AddTopic from "./pages/trainer/AddTopic";
import TrainerLayout from "./pages/trainer/TrainerLayout";
import TrainerNavbar from "./pages/trainer/TrainerNavbar";
import TrainerDashboardHome from "./pages/trainer/TrainerDashboardHome";

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
      {/* <Route path="/admin/dashboard" element={<AdminLayout />}
      >
        <Route index element={<AdminDashboard />} />
        <Route path="/admin/dashboard/manageTrainers" element={<ManageTrainers />} />
        <Route path="/admin/dashboard/addTrainer" element={<AddTrainer />} />
        <Route path="/admin/trainers/edit/:id" element={<AdminEditTrainer />}
        />
      </Route> */}

      {/* spair admin routes */}


      <Route path="/admin/dashboard" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

        <Route
          path="profile"
          element={<AdminProfile />}
        />

        <Route
          path="manageTrainers"
          element={<ManageTrainers />}
        />

        <Route
          path="addTrainer"
          element={<AddTrainer />}
        />

        <Route
          path="trainers/edit/:id"
          element={<AdminEditTrainer />}
        />

        <Route
          path="students"
          element={<AdminManageStudents />}
        />
      </Route>

      {/* Trainer Routes */}
      {/* <Route
        path="/trainer/dashboard"
        element={<TrainerDashboard />}
      /> */}
      {/*Spair trainer routes */}
      {/* <Route path="/trainer/dashboard" element={<TrainerLayout />}>


        <Route index element={<TrainerDashboardHome />} />
        <Route index element={<TrainerDashboard />} />

      
        <Route path="courses">
          <Route index element={<ManageCourses />} />
          <Route path="add" element={<AddCourse />} />
          <Route path="edit/:id" element={<EditCourse />} />
        </Route>

      </Route> */}

      {/*------------------*/}


        <Route path="/trainer/dashboard" element={<TrainerLayout />}>
        <Route index element={<TrainerDashboardHome />} />

        {/* COURSES MODULE */}
        <Route path="courses">
          <Route index element={<ManageCourses />} />
          <Route path="add" element={<AddCourse />} />
         
           <Route path="trainer/dashboard" element={< TrainerDashboard />} />
            <Route path="trainer/TrainerDashboardHome" element={< TrainerDashboardHome />} />
           
          <Route path="edit/:id" element={<EditCourse />} />
        </Route>
      </Route>

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={<StudentDashboard />}
      />

    </Routes>

  );
}

export default App;