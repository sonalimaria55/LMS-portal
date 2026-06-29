// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Grid,
//   TextField,
//   InputAdornment,
//   CircularProgress,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import { useNavigate } from "react-router-dom";
// import API from "../../api/API";

// function StudentDashboard() {
//   const [courses, setCourses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   const fetchCourses = async () => {
//     try {
//       setLoading(true);

//       const res = await API.get("/student/courses");

//       console.log("Response:", res.data);

//       setCourses(res.data.courses || []);
//     } catch (error) {
//       console.error("Error fetching courses:", error);

//       if (error.response) {
//         console.log(error.response.data);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const filteredCourses = courses.filter((course) =>
//     course?.title?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" fontWeight="bold" mb={3}>
//         Student Dashboard
//       </Typography>

//       {/* Search */}
//       <TextField
//         fullWidth
//         placeholder="Search courses..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         sx={{ mb: 4 }}
//         slotProps={{
//           input: {
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           },
//         }}
//       />

//       {/* Courses Grid */}
//       <Grid container spacing={3}>
//         {filteredCourses.length > 0 ? (
//           filteredCourses.map((course) => (
//             <Grid item xs={12} sm={6} md={4} key={course._id}>
//               <Card
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   borderRadius: 2,
//                   boxShadow: 3,
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6" fontWeight="bold">
//                     {course.title}
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ mt: 1 }}
//                   >
//                     {course.description}
//                   </Typography>

//                   <Typography variant="body2" sx={{ mt: 2 }}>
//                     <strong>Trainer:</strong> {course.trainer?.name}
//                   </Typography>
//                 </CardContent>

//                 <CardActions sx={{ mt: "auto", p: 2 }}>
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     onClick={() =>
//                       navigate(
//                         `/student/dashboard/courses/${course._id}`
//                       )
//                     }
//                   >
//                     View Course
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Grid item xs={12}>
//             <Typography align="center">
//               No published courses available
//             </Typography>
//           </Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// }

// export default StudentDashboard;
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid, // Reverted to standard classic Grid for compatibility
  TextField,
  InputAdornment,
  CircularProgress,
  Avatar,
  CardMedia,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import API from "../../api/API";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const res = await API.get("/student/courses");

      console.log("Response:", res.data);

      setCourses(res.data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);

      if (error.response) {
        console.log(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ p: 8, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress size={40} thickness={4} sx={{ color: "#1976d2" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 3, md: 5 }, backgroundColor: "#ffffff", minHeight: "100vh" }}>
      
      {/* Header Titles */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          fontWeight="800" 
          letterSpacing="-0.5px" 
          sx={{ color: "#0f2239", fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 1 }}
        >
          Available Courses
        </Typography>
        <Typography variant="body1" sx={{ color: "#68768a", fontWeight: 400 }}>
          Explore and start learning from available courses.
        </Typography>
      </Box>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search for courses, topics, or keywords..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          mb: 6,
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "#f8fafc",
            "& fieldset": { borderColor: "#e2e8f0" },
            "&:hover fieldset": { borderColor: "#cbd5e1" },
            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#94a3b8" }} />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Standard Rectangular Fixed-Width & Height Grid */}
      <Grid container spacing={4} alignItems="stretch">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id} sx={{ display: "flex" }}>
              <Card
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "12px",
                  boxShadow: "none",
                  border: "1px solid #eef2f6",
                  backgroundColor: "#ffffff",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(15, 34, 57, 0.06)",
                    borderColor: "#dbeafe"
                  },
                }}
              >
                {/* Course Image Cover */}
                <CardMedia
                  component="img"
                  height="180"
                  image={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60&sig=${course._id}`}
                  alt={course.title}
                  sx={{ backgroundColor: "#f8fafc", objectFit: "cover" }}
                />

                <CardContent sx={{ p: 4, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  
                  {/* Title Header with horizontal cutoff safety */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: "#ff6f61", 
                        width: 32, 
                        height: 32, 
                        fontSize: "0.85rem", 
                        fontWeight: "700",
                        textTransform: "uppercase",
                        flexShrink: 0
                      }}
                    >
                      {course.title ? course.title.charAt(0) : "C"}
                    </Avatar>
                    
                    <Typography 
                      variant="h5" 
                      fontWeight="700" 
                      sx={{ 
                        color: "#0f2239", 
                        fontSize: "1.25rem", 
                        lineHeight: 1.3, 
                        textTransform: "capitalize",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {course.title}
                    </Typography>
                  </Box>

                  {/* Course Description Block */}
                  <Box sx={{ flexGrow: 1, mb: 3 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#68768a",
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {course.description || "No specific details provided for this active training program track."}
                    </Typography>
                  </Box>

                  {/* Trainer Block aligned to card base */}
                  {course.trainer?.name && (
                    <Box sx={{ mt: "auto", pt: 1.5, borderTop: "1px dashed #eef2f6" }}>
                      <Typography variant="caption" sx={{ color: "#94a3b8", display: "block", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.5px" }}>
                        Trainer
                      </Typography>
                      <Typography variant="body2" fontWeight="600" sx={{ color: "#0f2239", textTransform: "capitalize" }}>
                        {course.trainer.name}
                      </Typography>
                    </Box>
                  )}
                </CardContent>

                {/* Single View Button pinned uniformly to base */}
                <CardActions sx={{ p: 4, pt: 0, mt: "auto" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    endIcon={<ArrowForwardIcon sx={{ fontSize: "16px !important" }} />}
                    onClick={() =>
                      navigate(
                        `/student/dashboard/courses/${course._id}`
                      )
                    }
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#ffffff",
                      borderRadius: "6px",
                      py: 1.3,
                      fontSize: "14px",
                      fontWeight: "700",
                      textTransform: "none",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#0f2239",
                        boxShadow: "none",
                      },
                    }}
                  >
                    View Course
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ py: 8, textAlign: "center" }}>
              <Typography variant="body1" sx={{ color: "#68768a", fontWeight: 500 }}>
                No published courses available
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default StudentDashboard;