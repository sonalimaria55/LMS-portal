import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Container,
} from "@mui/material";

import { useEffect, useState } from "react";
import API from "../../api/API";

function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCourses = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        "/student/courses"
      );

      if (response.data.success) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleEnroll = (courseId) => {
    console.log("Enroll:", courseId);

    alert(
      "Enrollment feature will be added next."
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Available Courses
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Explore and enroll in courses.
      </Typography>

      <Grid container spacing={3}>
        {courses.length === 0 ? (
          <Grid size={12}>
            <Typography textAlign="center">
              No Courses Available
            </Typography>
          </Grid>
        ) : (
          courses.map((course) => (
            <Grid
              key={course._id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={
                    course.thumbnail ||
                    "https://via.placeholder.com/400x200?text=Course"
                  }
                  alt={course.title}
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {course.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {course.description}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    color="primary"
                  >
                    Trainer
                  </Typography>

                  <Typography>
                    {course.trainer?.name ||
                      "Unknown Trainer"}
                  </Typography>
                </CardContent>

                <Box p={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                      handleEnroll(course._id)
                    }
                  >
                    Enroll Course
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default StudentCourses;


// import {
//   Box,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Container,
//   Button,
//   Avatar,
//   Stack,
// } from "@mui/material";

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api/API";

// const getRandomColor = (str = "") => {
//   const colors = [
//     "#1e293b",
//     "#0f766e",
//     "#1d4ed8",
//     "#6d28d9",
//     "#be185d",
//     "#c2410c",
//   ];

//   let hash = 0;

//   for (let i = 0; i < str.length; i++) {
//     hash = str.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   return colors[Math.abs(hash) % colors.length];
// };

// function StudentCourses() {
//   const navigate = useNavigate();

//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const getCourses = async () => {
//     try {
//       setLoading(true);

//       const response = await API.get(
//         "/trainer/courses"
//       );

//       if (response.data.success) {
//         setCourses(
//           response.data.data || []
//         );
//       }
//     } catch (error) {
//       console.error(error);

//       alert(
//         error.response?.data?.message ||
//           "Failed to fetch courses"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getCourses();
//   }, []);

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "80vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         background:
//           "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
//         minHeight: "100vh",
//         py: 4,
//       }}
//     >
//       <Container maxWidth="xl">
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           gutterBottom
//           sx={{
//             color: "#0f172a",
//           }}
//         >
//           Available Courses
//         </Typography>

//         <Typography
//           color="text.secondary"
//           sx={{ mb: 4 }}
//         >
//           Explore and start learning from
//           available courses.
//         </Typography>

//         <Grid container spacing={3}>
//           {courses.length === 0 ? (
//             <Grid size={12}>
//               <Typography
//                 textAlign="center"
//                 color="text.secondary"
//               >
//                 No courses available.
//               </Typography>
//             </Grid>
//           ) : (
//             courses.map((course) => (
//               <Grid
//                 key={course._id}
//                 size={{
//                   xs: 12,
//                   sm: 6,
//                   lg: 4,
//                 }}
//               >
//                 <Card
//                   sx={{
//                     display: "flex",
//                     height: 220,
//                     borderRadius: 4,
//                     overflow: "hidden",
//                     boxShadow: 3,
//                     transition: "0.3s",
//                     "&:hover": {
//                       transform:
//                         "translateY(-5px)",
//                       boxShadow: 6,
//                     },
//                   }}
//                 >
//                   {/* Left Image */}
//                   <CardMedia
//                     component="img"
//                     image={
//                       course.image ||
//                       "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
//                     }
//                     alt={course.title}
//                     sx={{
//                       width: 180,
//                       objectFit: "cover",
//                     }}
//                   />

//                   {/* Right Content */}
//                   <CardContent
//                     sx={{
//                       flex: 1,
//                       display: "flex",
//                       flexDirection: "column",
//                     }}
//                   >
//                     <Stack
//                       direction="row"
//                       spacing={1.5}
//                       alignItems="center"
//                       mb={1.5}
//                     >
//                       <Avatar
//                         sx={{
//                           bgcolor:
//                             getRandomColor(
//                               course.title
//                             ),
//                           width: 38,
//                           height: 38,
//                         }}
//                       >
//                         {course.title
//                           ?.charAt(0)
//                           ?.toUpperCase()}
//                       </Avatar>

//                       <Typography
//                         variant="h6"
//                         fontWeight="700"
//                         sx={{
//                           lineHeight: 1.2,
//                           display:
//                             "-webkit-box",
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient:
//                             "vertical",
//                           overflow: "hidden",
//                         }}
//                       >
//                         {course.title}
//                       </Typography>
//                     </Stack>

//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{
//                         flexGrow: 1,
//                         overflow: "hidden",
//                         display:
//                           "-webkit-box",
//                         WebkitLineClamp: 3,
//                         WebkitBoxOrient:
//                           "vertical",
//                       }}
//                     >
//                       {course.description}
//                     </Typography>

//                     {/* Trainer Section */}
//                     <Box
//                       sx={{
//                         p: 1.2,
//                         bgcolor: "#f8fafc",
//                         borderRadius: 2,
//                         mt: 1,
//                         mb: 1,
//                         border:
//                           "1px solid #e2e8f0",
//                       }}
//                     >
//                       <Typography
//                         variant="caption"
//                         sx={{
//                           color: "#64748b",
//                           fontWeight: 700,
//                           letterSpacing:
//                             0.5,
//                         }}
//                       >
//                         COURSE TRAINER
//                       </Typography>

//                       <Typography
//                         fontWeight="600"
//                         fontSize="0.95rem"
//                         sx={{
//                           color:
//                             "#0f172a",
//                         }}
//                       >
//                         {course.trainer
//                           ?.name ||
//                           "Trainer"}
//                       </Typography>

//                       <Typography
//                         variant="caption"
//                         sx={{
//                           color:
//                             "#94a3b8",
//                         }}
//                       >
//                         {course.trainer
//                           ?.email || ""}
//                       </Typography>
//                     </Box>

//                     <Button
//                       variant="contained"
//                       size="small"
//                       sx={{
//                         textTransform:
//                           "none",
//                         borderRadius: 2,
//                         fontWeight: 600,
//                         backgroundColor:
//                           "#0f172a",
//                         "&:hover": {
//                           backgroundColor:
//                             "#1e293b",
//                         },
//                       }}
//                       onClick={() =>
//                         navigate(
//                           `/student/courses/${course._id}`
//                         )
//                       }
//                     >
//                       View Course
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))
//           )}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

// export default StudentCourses;



// import {
//   Box,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Container,
//   Pagination,
//   CardActionArea,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api/API";

// function StudentCourses() {
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);

//   const getCourses = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get("/trainer/courses");
//       if (response.data.success) {
//         setCourses(response.data.data || []);
//       }
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       alert(error?.response?.data?.message || "Failed to fetch courses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getCourses();
//   }, []);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//         sx={{ background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" }}
//       >
//         <CircularProgress size={40} sx={{ color: "#0f172a" }} />
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
//         minHeight: "100vh",
//         py: { xs: 6, md: 8 },
//         display: "flex",
//         alignItems: "center",
//       }}
//     >
//       <Container maxWidth="lg">
//         {/* Main Canvas Card mimicking the provided layout image wrapper */}
//         <Box
//           sx={{
//             bgcolor: "#ffffff",
//             borderRadius: "24px",
//             boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.03)",
//             p: { xs: 4, md: 8 },
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           {/* Header Section */}
//           <Box sx={{ textAlign: "center", mb: 6, maxWidth: "600px" }}>
//             <Typography
//               variant="h4"
//               fontWeight="700"
//               sx={{ color: "#000000", mb: 1.5, letterSpacing: "-0.5px" }}
//             >
//               Available Courses
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{ color: "#94a3b8", lineHeight: 1.6, fontSize: "0.95rem" }}
//             >
//               Explore our comprehensive modules. Start customizing your roadmap
//               and accelerating your learning goals today.
//             </Typography>
//           </Box>

//           {/* Courses Grid */}
//           <Grid container spacing={3} sx={{ width: "100%", mb: 6 }}>
//             {courses.length === 0 ? (
//               <Grid item xs={12}>
//                 <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
//                   No courses available right now.
//                 </Typography>
//               </Grid>
//             ) : (
//               courses.map((course) => (
//                 <Grid item key={course._id} xs={12} sm={6} md={4} lg={3}>
//                   <Card
//                     elevation={0}
//                     sx={{
//                       height: "100%",
//                       display: "flex",
//                       flexDirection: "column",
//                       borderRadius: "16px",
//                       border: "1px solid #f1f5f9",
//                       transition: "transform 0.2s ease, box-shadow 0.2s ease",
//                       "&:hover": {
//                         transform: "translateY(-4px)",
//                         boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.04)",
//                       },
//                     }}
//                   >
//                     <CardActionArea
//                       onClick={() => navigate(`/student/courses/${course._id}`)}
//                       sx={{
//                         height: "100%",
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "stretch",
//                         justifyContent: "flex-start",
//                       }}
//                     >
//                       {/* Course Card Thumbnail */}
//                       <CardMedia
//                         component="img"
//                         height="140"
//                         image={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"}
//                         alt={course.title}
//                         sx={{
//                           borderRadius: "12px 12px 0 0",
//                           objectFit: "cover",
//                         }}
//                       />

//                       <CardContent sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//                         {/* Course Title with Line Clamping */}
//                         <Typography
//                           variant="body1"
//                           fontWeight="600"
//                           sx={{
//                             color: "#0f172a",
//                             lineHeight: 1.4,
//                             mb: 2,
//                             display: "-webkit-box",
//                             WebkitLineClamp: 2,
//                             WebkitBoxOrient: "vertical",
//                             overflow: "hidden",
//                             minHeight: "2.8em",
//                           }}
//                         >
//                           {course.title}
//                         </Typography>

//                         {/* Trainer Name & Course Meta Row */}
//                         <Box
//                           display="flex"
//                           justifyContent="space-between"
//                           alignItems="center"
//                           sx={{ borderTop: "1px solid #f8fafc", pt: 1.5 }}
//                         >
//                           <Typography
//                             variant="caption"
//                             sx={{ color: "#94a3b8", fontWeight: 500 }}
//                           >
//                             {course.trainer?.name || "Instructor"}
//                           </Typography>
//                           <Typography
//                             variant="caption"
//                             sx={{ color: "#cbd5e1" }}
//                           >
//                             Active
//                           </Typography>
//                         </Box>
//                       </CardContent>
//                     </CardActionArea>
//                   </Card>
//                 </Grid>
//               ))
//             )}
//           </Grid>

//           {/* Minimalist Pagination Bar matching Website Blog Post Cards.jpg */}
//           <Pagination
//             count={10}
//             page={page}
//             onChange={handlePageChange}
//             shape="rounded"
//             variant="outlined"
//             size="small"
//             sx={{
//               "& .MuiPaginationItem-root": {
//                 color: "#94a3b8",
//                 borderColor: "#e2e8f0",
//                 borderRadius: "6px",
//                 fontWeight: "600",
//                 mx: 0.5,
//                 "&:hover": {
//                   bgcolor: "#f8fafc",
//                 },
//                 "&.Mui-selected": {
//                   color: "#2563eb",
//                   borderColor: "#2563eb",
//                   bgcolor: "rgba(37, 99, 235, 0.04)",
//                   "&:hover": {
//                     bgcolor: "rgba(37, 99, 235, 0.08)",
//                   },
//                 },
//               },
//             }}
//           />
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// export default StudentCourses;


// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CircularProgress,
//   Avatar,
//   Stack,
// } from "@mui/material";

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api/API";

// function StudentCourses() {
//   const navigate = useNavigate();

//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const getCourses = async () => {
//     try {
//       setLoading(true);

//       const response = await API.get("/trainer/courses");

//       console.log("RESPONSE =", response.data);

//       if (response.data.success) {
//         setCourses(response.data.data || []);
//       }
//     } catch (error) {
//       console.error("Error fetching courses:", error);

//       alert(
//         error?.response?.data?.message ||
//           "Failed to fetch courses"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getCourses();
//   }, []);

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="60vh"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box p={3}>
//       <Typography
//         variant="h4"
//         fontWeight="bold"
//         gutterBottom
//       >
//         Available Courses
//       </Typography>

//       <Typography
//         color="text.secondary"
//         sx={{ mb: 4 }}
//       >
//         Explore and start learning from available courses.
//       </Typography>

//       <Grid container spacing={3}>
//         {courses.length === 0 ? (
//           <Grid size={12}>
//             <Typography
//               align="center"
//               color="text.secondary"
//             >
//               No courses available.
//             </Typography>
//           </Grid>
//         ) : (
//           courses.map((course) => (
//             <Grid
//               key={course._id}
//               size={{
//                 xs: 12,
//                 sm: 6,
//                 md: 4,
//                 lg: 3,
//               }}
//             >
//               <Card
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Stack
//                     direction="row"
//                     spacing={2}
//                     alignItems="center"
//                     mb={2}
//                   >
//                     <Avatar>
//                       {course.title
//                         ?.charAt(0)
//                         ?.toUpperCase()}
//                     </Avatar>

//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                     >
//                       {course.title}
//                     </Typography>
//                   </Stack>

//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ mb: 2 }}
//                   >
//                     {course.description}
//                   </Typography>

//                   <Typography
//                     variant="subtitle2"
//                     color="primary"
//                   >
//                     Trainer
//                   </Typography>

//                   <Typography>
//                     {course.trainer?.name || "N/A"}
//                   </Typography>
//                 </CardContent>

//                 <Box p={2}>
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     onClick={() =>
//                       navigate(
//                         `/student/courses/${course._id}`
//                       )
//                     }
//                   >
//                     View Course
//                   </Button>
//                 </Box>
//               </Card>
//             </Grid>
//           ))
//         )}
//       </Grid>
//     </Box>
//   );
// }

// export default StudentCourses;