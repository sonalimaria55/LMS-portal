import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          py: { xs: 6, md: 0 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center">

            {/* LEFT CONTENT */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{
                  color: "#0f172a",
                  fontSize: { xs: "2.2rem", md: "3.5rem" },
                  lineHeight: 1.2,
                }}
                gutterBottom
              >
                Learn Skills That Build Your Career 🚀
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4, fontSize: { xs: "1rem", md: "1.2rem" } }}
              >
                Join EduSphere and access premium courses, expert trainers,
                and industry-recognized certifications.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#2563eb",
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "#1d4ed8",
                    },
                  }}
                >
                  Explore Courses
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>

            {/* RIGHT IMAGE */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                  alt="Learning"
                  style={{
                    width: "100%",
                    display: "block",
                  }}
                />
              </Box>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* FEATURES SECTION */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 6, fontSize: { xs: "1.8rem", md: "2.5rem" } }}
        >
          Why Choose EduSphere?
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              icon: <SchoolIcon sx={{ fontSize: 50 }} />,
              title: "Expert Courses",
              desc: "Learn from industry professionals with real-world experience.",
            },
            {
              icon: <GroupsIcon sx={{ fontSize: 50 }} />,
              title: "Community Learning",
              desc: "Connect and learn with students worldwide.",
            },
            {
              icon: <WorkspacePremiumIcon sx={{ fontSize: 50 }} />,
              title: "Certification",
              desc: "Earn certificates that boost your career growth.",
            },
          ].map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 35px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Box color="#2563eb">{item.icon}</Box>

                <Typography variant="h5" mt={2} fontWeight="bold">
                  {item.title}
                </Typography>

                <Typography color="text.secondary" mt={1}>
                  {item.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* STATS SECTION */}
      <Box
        sx={{
          bgcolor: "#0f172a",
          color: "white",
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">

            <Grid item xs={12} md={4}>
              <Typography variant="h3" fontWeight="bold">
                500+
              </Typography>
              <Typography>Courses</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h3" fontWeight="bold">
                10K+
              </Typography>
              <Typography>Students</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h3" fontWeight="bold">
                100+
              </Typography>
              <Typography>Trainers</Typography>
            </Grid>

          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Home;