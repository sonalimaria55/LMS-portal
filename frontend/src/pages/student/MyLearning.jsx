import React, { useEffect, useState } from "react";
import API from "../../api/API";
import { useNavigate } from "react-router-dom";

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ⚠️ adjust this depending on how you store token
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMyLearning();
  }, []);

  const fetchMyLearning = async () => {
    try {
      setLoading(true);

      const res = await API.get("/student/my-learning", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("My Learning Response:", res.data);

      setCourses(res.data.courses || []);
    } catch (error) {
      console.log("Error fetching my learning:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h3>Loading your courses...</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Learning</h2>

      {courses.length === 0 ? (
        <p>You have not enrolled in any courses yet.</p>
      ) : (
        courses.map((course) => (
          <div
            key={course._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{course.title}</h3>
            <p>{course.description}</p>

            {course.trainer && (
              <p>
                <b>Trainer:</b> {course.trainer.name} ({course.trainer.email})
              </p>
            )}

            <button
              onClick={() => navigate(`/student/course/${course._id}`)}
              style={{
                padding: "8px 12px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              Continue Learning
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyLearning;