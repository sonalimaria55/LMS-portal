import { Paper, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import API from "../../api/API";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!formData.title || !formData.description) {
      alert("Title and Description required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/trainer/courses", formData);

      alert("Course added successfully");

      setFormData({
        title: "",
        description: "",
        category: "",
        thumbnail: "",
      });

      navigate("/trainer/dashboard/courses");

    } catch (err) {
      console.log(err);
      alert("Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>

      <Typography variant="h5" mb={2}>
        Add Course
      </Typography>

      <form onSubmit={handleSubmit}>

        <TextField
          fullWidth
          label="Title"
          margin="normal"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />

        <TextField
          fullWidth
          label="Description"
          margin="normal"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <TextField
          fullWidth
          label="Category"
          margin="normal"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />

        <TextField
          fullWidth
          label="Thumbnail"
          margin="normal"
          value={formData.thumbnail}
          onChange={(e) =>
            setFormData({ ...formData, thumbnail: e.target.value })
          }
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Course"}
        </Button>

      </form>
    </Paper>
  );
}

export default AddCourse;

// import { Paper, TextField, Typography, Button } from "@mui/material";
// import { useState } from "react";
// import API from "../../api/API";
// import { useNavigate } from "react-router-dom";

// function AddCourse() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//     thumbnail: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await API.post("/trainer/courses", formData);

//       navigate("/trainer/dashboard/courses");

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <Paper sx={{ p: 3 }}>
//       <Typography variant="h5" mb={2}>
//         Add Course
//       </Typography>

//       <form onSubmit={handleSubmit}>

//         <TextField fullWidth label="Title" margin="normal"
//           onChange={(e) =>
//             setFormData({ ...formData, title: e.target.value })
//           }
//         />

//         <TextField fullWidth label="Description" margin="normal"
//           onChange={(e) =>
//             setFormData({ ...formData, description: e.target.value })
//           }
//         />

//         <TextField fullWidth label="Category" margin="normal"
//           onChange={(e) =>
//             setFormData({ ...formData, category: e.target.value })
//           }
//         />

//         <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//           Save Course
//         </Button>

//       </form>
//     </Paper>
//   );
// }

// export default AddCourse;