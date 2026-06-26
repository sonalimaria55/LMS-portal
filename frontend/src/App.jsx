import { Routes, Route } from "react-router-dom";

/* ================= Common ================= */
import LandingPage from "./pages/common/LandingPage";
import Home from "./pages/common/Home";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";

/* ================= Admin ================= */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageTrainers from "./pages/admin/ManageTrainers";
import AddTrainer from "./pages/admin/AddTrainer";
import AdminEditTrainer from "./pages/admin/AdminEditTrainer";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminManageStudents from "./pages/admin/AdminManageStudents";

/* ================= Trainer ================= */
import TrainerLayout from "./pages/trainer/TrainerLayout";
import TrainerDashboardHome from "./pages/trainer/TrainerDashboardHome";
import ManageCourses from "./pages/trainer/ManageCourses";
import AddCourse from "./pages/trainer/AddCourse";
import EditCourse from "./pages/trainer/EditCourse";
import CourseTopics from "./pages/trainer/CourseTopics";
import AddTopic from "./pages/trainer/AddTopic";
import EditTopic from "./pages/trainer/EditTopic";

/* ================= Student ================= */
import StudentLayout from "./pages/student/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentCourseDetails from "./pages/student/StudentCourseDetails";

/* 👇 IMPORTANT: MATCH YOUR REAL FILE NAMES */
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<LandingPage />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* ================= ADMIN ================= */}
      <Route path="/admin/dashboard" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="manageTrainers" element={<ManageTrainers />} />
        <Route path="trainers/add" element={<AddTrainer />} />
        <Route path="trainers/edit/:id" element={<AdminEditTrainer />} />
        <Route path="students" element={<AdminManageStudents />} />
      </Route>

      {/* ================= TRAINER ================= */}
      <Route path="/trainer/dashboard" element={<TrainerLayout />}>
        <Route index element={<TrainerDashboardHome />} />

        <Route path="courses">
          <Route index element={<ManageCourses />} />
          <Route path="add" element={<AddCourse />} />
          <Route path="edit/:id" element={<EditCourse />} />
          <Route path=":courseId/topics" element={<CourseTopics />} />
          <Route path=":courseId/topics/add" element={<AddTopic />} />
        </Route>

        <Route path="topics/edit/:topicId" element={<EditTopic />} />
      </Route>

      {/* ================= STUDENT ================= */}
      <Route path="/student/dashboard/*" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />

        <Route path="courses" element={<StudentCourses />} />

        <Route
          path="courses/:courseId"
          element={<StudentCourseDetails />}
        />

        <Route path="my-learning" element={<MyLearning />} />

        <Route path="profile" element={<Profile />} />
      </Route>

    </Routes>
  );
}

export default App;