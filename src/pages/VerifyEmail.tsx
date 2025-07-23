// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Button,
//   Grid,
//   useTheme,
//   useMediaQuery,
//   Paper,
//   Fade,
//   Grow,
//   LinearProgress,
//   IconButton,
// } from "@mui/material";
// import { keyframes } from "@mui/system";
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Logo from "../assets/images/logo/Logo.png";
// import VerifyEmailImage from "../assets/images/verifyEmail.svg";

// // Enhanced animations
// const pulseAnimation = keyframes`
//   0% { transform: scale(1); opacity: 1; }
//   50% { transform: scale(1.05); opacity: 0.8; }
//   100% { transform: scale(1); opacity: 1; }
// `;

// const slideUp = keyframes`
//   from { transform: translateY(30px); opacity: 0; }
//   to { transform: translateY(0); opacity: 1; }
// `;

// const checkAnimation = keyframes`
//   0% { transform: scale(0) rotate(0deg); opacity: 0; }
//   50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
//   100% { transform: scale(1) rotate(360deg); opacity: 1; }
// `;

// const errorShake = keyframes`
//   0%, 100% { transform: translateX(0); }
//   25% { transform: translateX(-5px); }
//   75% { transform: translateX(5px); }
// `;

// const VerifyEmail: React.FC = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
//   const [message, setMessage] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [countdown, setCountdown] = useState(3);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//   const email = searchParams.get("email");
//   const token = searchParams.get("token");

//   const [hasVerified, setHasVerified] = useState(false);

//   // Progress bar animation
//   useEffect(() => {
//     if (status === "loading") {
//       const timer = setInterval(() => {
//         setProgress((prev) => {
//           if (prev >= 90) return prev;
//           return prev + Math.random() * 10;
//         });
//       }, 200);
//       return () => clearInterval(timer);
//     }
//   }, [status]);

//   // Countdown timer for success redirect
//   useEffect(() => {
//     if (status === "success") {
//       const timer = setInterval(() => {
//         setCountdown((prev) => {
//           if (prev <= 1) {
//             navigate("/");
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [status, navigate]);

//   useEffect(() => {
//     const verify = async () => {
//       if (hasVerified) return;
      
//       try {
//         const res = await axios.get("https://localhost:7211/api/user/auth/verify-email", {
//           params: { email, token },
//         });
        
//         if (res.status === 200) {
//           setProgress(100);
//           setTimeout(() => {
//             setMessage("Your email has been verified successfully!");
//             setStatus("success");
//             setHasVerified(true);
//           }, 500);
//         }
//       } catch (error: any) {
//         console.error("Verification error:", error);
        
//         setProgress(100);
//         setTimeout(() => {
//           if (error.response && error.response.status === 400) {
//             setMessage("Invalid verification link. Please check your email for the correct link.");
//           } else {
//             setMessage("An error occurred during verification. Please try again.");
//           }
//           setStatus("error");
//           setHasVerified(true);
//         }, 500);
//       }
//     };

//     if (!email || !token) {
//       setMessage("Invalid verification link. Please check your email for the correct link.");
//       setStatus("error");
//     } else {
//       verify();
//     }
//   }, [email, token, navigate, hasVerified]);

//   const handleRetry = () => {
//     setStatus("loading");
//     setProgress(0);
//     setHasVerified(false);
//   };

//   return (
//     <Grid
//       container
//       sx={{
//         height: "100vh",
//         width: "100vw",
//         margin: 0,
//         padding: 0,
//         overflow: "hidden",
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       }}
//     >
//       {/* Left Section - Image (hidden on small screens) */}
//       <Grid
//         item
//         xs={0}
//         md={6}
//         sx={{
//           display: { xs: "none", md: "flex" }, // Hide on xs, show on md and up
//           background: "linear-gradient(135deg, #023E8A 0%, #0077B6 50%, #00B4D8 100%)",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           position: "relative",
//           overflow: "hidden",
//           flexDirection: "column",
//           flexGrow: 1,
//         }}
//       >
//         {/* Animated background elements */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: "20%",
//             left: "10%",
//             width: "100px",
//             height: "100px",
//             borderRadius: "50%",
//             background: "rgba(255, 255, 255, 0.1)",
//             animation: `${pulseAnimation} 3s ease-in-out infinite`,
//           }}
//         />
//         <Box
//           sx={{
//             position: "absolute",
//             bottom: "30%",
//             right: "15%",
//             width: "60px",
//             height: "60px",
//             borderRadius: "50%",
//             background: "rgba(255, 255, 255, 0.1)",
//             animation: `${pulseAnimation} 2s ease-in-out infinite`,
//             animationDelay: "1s",
//           }}
//         />

//         <Fade in timeout={1000}>
//           <Box sx={{ 
//             textAlign: "center", 
//             p: 4, 
//             width: "100%", 
//             maxWidth: 400,
//             zIndex: 1,
//           }}>
//             <Box
//               sx={{
//                 animation: `${slideUp} 0.8s ease-out`,
//                 mb: 4,
//               }}
//             >
//               <img
//                 src={VerifyEmailImage}
//                 alt="Email Verification"
//                 style={{ 
//                   width: "100%", 
//                   height: "auto",
//                   filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
//                 }}
//               />
//             </Box>
//             <Typography 
//               variant="h6" 
//               color="white" 
//               sx={{ 
//                 fontWeight: 500,
//                 textShadow: "0 2px 4px rgba(0,0,0,0.2)",
//                 animation: `${slideUp} 0.8s ease-out`,
//                 animationDelay: "0.2s",
//                 animationFillMode: "both",
//               }}
//             >
//               Secure your account with email verification
//             </Typography>
//             <Typography 
//               variant="body2" 
//               color="rgba(255,255,255,0.8)" 
//               sx={{ 
//                 mt: 2,
//                 animation: `${slideUp} 0.8s ease-out`,
//                 animationDelay: "0.4s",
//                 animationFillMode: "both",
//               }}
//             >
//               We're verifying your email to ensure account security
//             </Typography>
//           </Box>
//         </Fade>
//       </Grid>

//       {/* Right Section - Form */}
//       <Grid
//         item
//         xs={12}
//         md={6}
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           p: { xs: 2, md: 4 },
//           position: "relative",
//           overflow: "hidden", 
//           flexDirection: "column",
//           flexGrow: 1,
          
//           // Background changes based on screen size
//           background: {
//             xs: "linear-gradient(135deg, #023E8A 0%, #0077B6 50%, #00B4D8 100%)", // Custom gradient for small screens
//             md: "#fff" // White background for larger screens
//           },
          
//           // Add a subtle pattern or overlay for mobile (optional)
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: {
//               xs: "rgba(255, 255, 255, 0.1)", // Light overlay on mobile
//               md: "none"
//             },
//             pointerEvents: "none",
//             zIndex: 0
//           }
//         }}
//       >
//         <Paper
//           elevation={0}
//           sx={{
//             width: "100%",
//             maxWidth: { xs: 350, sm: 400, md: 450 },
//             textAlign: "center",
//             p: { xs: 3, sm: 4 },
//             borderRadius: 3,
//             background: "rgba(255, 255, 255, 0.9)",
//             backdropFilter: "blur(10px)",
//             border: "1px solid rgba(255, 255, 255, 0.2)",
//             position: "relative",
//             zIndex: 1,
//           }}
//         >
//           <Grow in timeout={800}>
//             <Box>
//               <img
//                 src={Logo}
//                 alt="Logo"
//                 style={{
//                   width: isMobile ? "60px" : isTablet ? "70px" : "80px",
//                   height: "auto",
//                   marginBottom: theme.spacing(3),
//                   filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
//                 }}
//               />

//               <Typography
//                 variant="h4"
//                 sx={{
//                   fontWeight: 700,
//                   background: "linear-gradient(45deg, #023E8A, #0077B6)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   mb: 1,
//                   fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.125rem" },
//                 }}
//               >
//                 Email Verification
//               </Typography>

//               <Typography
//                 variant="body2"
//                 color="textSecondary"
//                 sx={{ 
//                   mb: 4, 
//                   opacity: 0.8,
//                   fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                   px: { xs: 1, sm: 0 },
//                 }}
//               >
//                 User Account Setup
//               </Typography>
//             </Box>
//           </Grow>

//           {/* Enhanced Loading State */}
//           {status === "loading" && (
//             <Fade in timeout={500}>
//               <Box>
//                 <Box sx={{ mb: 3 }}>
//                   <CircularProgress 
//                     size={isMobile ? 60 : 80} 
//                     thickness={3} 
//                     sx={{ 
//                       color: theme.palette.primary.main,
//                       animation: `${pulseAnimation} 2s ease-in-out infinite`,
//                     }} 
//                   />
//                 </Box>
//                 <Typography 
//                   variant="h6" 
//                   color="textPrimary" 
//                   sx={{ 
//                     mb: 2,
//                     fontWeight: 500,
//                     fontSize: { xs: "1.1rem", sm: "1.25rem" },
//                   }}
//                 >
//                   Verifying your email...
//                 </Typography>
//                 <Box sx={{ width: "100%", mb: 2 }}>
//                   <LinearProgress 
//                     variant="determinate" 
//                     value={progress} 
//                     sx={{
//                       height: 8,
//                       borderRadius: 4,
//                       backgroundColor: "rgba(2, 62, 138, 0.1)",
//                       "& .MuiLinearProgress-bar": {
//                         borderRadius: 4,
//                         background: "linear-gradient(45deg, #023E8A, #0077B6)",
//                       },
//                     }}
//                   />
//                 </Box>
//                 <Typography 
//                   variant="body2" 
//                   color="textSecondary"
//                   sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
//                 >
//                   Please wait while we verify your email address...
//                 </Typography>
//               </Box>
//             </Fade>
//           )}

//           {/* Enhanced Success State */}
//           {status === "success" && (
//             <Fade in timeout={500}>
//               <Box>
//                 <Box sx={{ 
//                   mb: 3,
//                   animation: `${checkAnimation} 0.6s ease-out`,
//                 }}>
//                   <CheckCircleOutlineIcon 
//                     sx={{ 
//                       fontSize: { xs: 60, sm: 70, md: 80 }, 
//                       color: theme.palette.success.main,
//                       filter: "drop-shadow(0 4px 8px rgba(76, 175, 80, 0.3))",
//                     }} 
//                   />
//                 </Box>
//                 <Typography 
//                   variant="h5" 
//                   sx={{ 
//                     mb: 2, 
//                     fontWeight: 600,
//                     color: theme.palette.success.main,
//                     fontSize: { xs: "1.25rem", sm: "1.5rem" },
//                   }}
//                 >
//                   Verification Successful!
//                 </Typography>
//                 <Typography 
//                   variant="body1" 
//                   sx={{ 
//                     mb: 2, 
//                     color: "text.secondary",
//                     fontSize: { xs: "0.9rem", sm: "1rem" },
//                     px: { xs: 1, sm: 0 },
//                   }}
//                 >
//                   {message}
//                 </Typography>
//                 <Box sx={{ 
//                   mb: 3,
//                   p: { xs: 1.5, sm: 2 },
//                   borderRadius: 2,
//                   backgroundColor: "rgba(76, 175, 80, 0.1)",
//                   border: "1px solid rgba(76, 175, 80, 0.2)",
//                 }}>
//                   <Typography 
//                     variant="body2" 
//                     color="success.main"
//                     sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
//                   >
//                     Redirecting to login in {countdown} seconds...
//                   </Typography>
//                 </Box>
//                 <Button
//                   onClick={() => navigate("/")}
//                   variant="contained"
//                   size="large"
//                   fullWidth
//                   sx={{ 
//                     py: { xs: 1.2, sm: 1.5 },
//                     borderRadius: 2,
//                     textTransform: "none",
//                     fontSize: { xs: "1rem", sm: "1.1rem" },
//                     fontWeight: 600,
//                     background: "linear-gradient(45deg, #023E8A, #0077B6)",
//                     boxShadow: "0 4px 15px rgba(2, 62, 138, 0.3)",
//                     "&:hover": {
//                       background: "linear-gradient(45deg, #012B5E, #005F8A)",
//                       boxShadow: "0 6px 20px rgba(2, 62, 138, 0.4)",
//                     },
//                   }}
//                 >
//                   Continue to Login
//                 </Button>
//               </Box>
//             </Fade>
//           )}

//           {/* Enhanced Error State */}
//           {status === "error" && (
//             <Fade in timeout={500}>
//               <Box sx={{ animation: `${errorShake} 0.5s ease-in-out` }}>
//                 <Box sx={{ mb: 3 }}>
//                   <ErrorOutlineIcon 
//                     sx={{ 
//                       fontSize: { xs: 60, sm: 70, md: 80 }, 
//                       color: theme.palette.error.main,
//                       filter: "drop-shadow(0 4px 8px rgba(244, 67, 54, 0.3))",
//                     }} 
//                   />
//                 </Box>
//                 <Typography 
//                   variant="h5" 
//                   sx={{ 
//                     mb: 2, 
//                     fontWeight: 600,
//                     color: theme.palette.error.main,
//                     fontSize: { xs: "1.25rem", sm: "1.5rem" },
//                   }}
//                 >
//                   Verification Failed
//                 </Typography>
//                 <Box sx={{ 
//                   mb: 3,
//                   p: { xs: 1.5, sm: 2 },
//                   borderRadius: 2,
//                   backgroundColor: "rgba(244, 67, 54, 0.1)",
//                   border: "1px solid rgba(244, 67, 54, 0.2)",
//                 }}>
//                   <Typography 
//                     variant="body1" 
//                     color="error.main"
//                     sx={{ 
//                       fontSize: { xs: "0.9rem", sm: "1rem" },
//                       px: { xs: 1, sm: 0 },
//                     }}
//                   >
//                     {message}
//                   </Typography>
//                 </Box>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <Button
//                       onClick={() => navigate("/register")}
//                       variant="outlined"
//                       size="large"
//                       fullWidth
//                       startIcon={<ArrowBackIcon />}
//                       sx={{
//                         py: { xs: 1.2, sm: 1.5 },
//                         borderRadius: 2,
//                         textTransform: "none",
//                         fontWeight: 600,
//                         fontSize: { xs: "0.9rem", sm: "1rem" },
//                         borderColor: theme.palette.primary.main,
//                         color: theme.palette.primary.main,
//                         "&:hover": {
//                           borderColor: theme.palette.primary.dark,
//                           backgroundColor: "rgba(2, 62, 138, 0.1)",
//                         },
//                       }}
//                     >
//                       Back to Sign Up
//                     </Button>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Button
//                       onClick={handleRetry}
//                       variant="contained"
//                       size="large"
//                       fullWidth
//                       startIcon={<RefreshIcon />}
//                       sx={{
//                         py: { xs: 1.2, sm: 1.5 },
//                         borderRadius: 2,
//                         textTransform: "none",
//                         fontWeight: 600,
//                         fontSize: { xs: "0.9rem", sm: "1rem" },
//                         background: "linear-gradient(45deg, #023E8A, #0077B6)",
//                         boxShadow: "0 4px 15px rgba(2, 62, 138, 0.3)",
//                         "&:hover": {
//                           background: "linear-gradient(45deg, #012B5E, #005F8A)",
//                           boxShadow: "0 6px 20px rgba(2, 62, 138, 0.4)",
//                         },
//                       }}
//                     >
//                       Try Again
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Fade>
//           )}
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default VerifyEmail;