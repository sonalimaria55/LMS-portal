import { Routes, Route } from "react-router-dom";

/* Common */
import LandingPage from "./pages/common/LandingPage";
import Home from "./pages/common/Home";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";

/* Admin */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageTrainers from "./pages/admin/ManageTrainers";
import AddTrainer from "./pages/admin/AddTrainer";
import AdminEditTrainer from "./pages/admin/AdminEditTrainer";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminManageStudents from "./pages/admin/AdminManageStudents";

/* Trainer */
import TrainerLayout from "./pages/trainer/TrainerLayout";
import TrainerDashboardHome from "./pages/trainer/TrainerDashboardHome";
import ManageCourses from "./pages/trainer/ManageCourses";
import AddCourse from "./pages/trainer/AddCourse";
import EditCourse from "./pages/trainer/EditCourse";
import CourseTopics from "./pages/trainer/CourseTopics";
import AddTopic from "./pages/trainer/AddTopic";
import EditTopic from "./pages/trainer/EditTopic";

/* Student */
import StudentLayout from "./pages/student/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import Courses from "./pages/student/Courses";
import CourseDetails from "./pages/student/CourseDetails";
import TopicPlayer from "./pages/student/TopicPlayer";
import StudentCourses from "./pages/student/StudentCourses";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={<AdminLayout />}
      >
        <Route
          index
          element={<AdminDashboard />}
        />

        <Route
          path="profile"
          element={<AdminProfile />}
        />

        <Route
          path="manageTrainers"
          element={<ManageTrainers />}
        />

        <Route
          path="trainers/add"
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
        element={<TrainerLayout />}
      >
        <Route
          index
          element={<TrainerDashboardHome />}
        />

        <Route path="courses">
          <Route
            index
            element={<ManageCourses />}
          />

          <Route
            path="add"
            element={<AddCourse />}
          />

          <Route
            path="edit/:id"
            element={<EditCourse />}
          />

          <Route
            path=":courseId/topics"
            element={<CourseTopics />}
          />

          <Route
            path=":courseId/topics/add"
            element={<AddTopic />}
          />

          <Route
            path="/trainer/dashboard/topics/edit/:topicId"
            element={<EditTopic />}
          />
        </Route>
      </Route> */}
      <Route
  path="/trainer/dashboard"
  element={<TrainerLayout />}
>
  <Route index element={<TrainerDashboardHome />} />

  <Route path="courses">
    <Route index element={<ManageCourses />} />
    <Route path="add" element={<AddCourse />} />
    <Route path="edit/:id" element={<EditCourse />} />

    <Route
      path=":courseId/topics"
      element={<CourseTopics />}
    />

    <Route
      path=":courseId/topics/add"
      element={<AddTopic />}
    />
  </Route>

  {/* ✅ FIXED: move OUTSIDE courses */}
  <Route
    path="topics/edit/:topicId"
    element={<EditTopic />}
  />
</Route>

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={<StudentLayout />}
      >
        <Route
          index
          element={<StudentDashboard/>}
        />

        <Route
          path="courses"
          element={<StudentCourses />}
        />
        

        <Route
          path="courses/:courseId"
          element={<CourseDetails />}
        />

        <Route
          path="courses/:courseId/topics/:topicId"
          element={<TopicPlayer />}
        />
      </Route>
    </Routes>
  );
}

export default App;