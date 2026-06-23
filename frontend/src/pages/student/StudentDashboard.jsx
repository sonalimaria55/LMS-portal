import React from "react";
import StudentLayout from "./StudentLayout";
import StudentCourses from "./StudentCourses";

function StudentDashboard() {
  return (
    <StudentLayout>
      <StudentCourses />
    </StudentLayout>
  );
}

export default StudentDashboard;