// import React, { useState } from "react";
// import {
//   Grid,
//   Box,
//   TextField,
//   InputAdornment,
//   Divider,
//   Button,
//   Typography,
//   Paper,
//   Fade,
//   Slide,
//   IconButton,
//   Alert,
//   LinearProgress,
//   Chip,
//   useTheme,
//   useMediaQuery
// } from "@mui/material";
// import LockIcon from "@mui/icons-material/LockOutlined";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ErrorIcon from "@mui/icons-material/Error";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import UserLeftImage from "../../components/LoginComponents/LoginLeftImage";
// import Logo from "../../assets/images/logo/Logo.png";
// import ResetPassword from "../../assets/images/ResetPassword.png";
// import { useSearchParams } from "react-router-dom";
// import { Link } from "react-router-dom";

// function AdminResetPassword() {
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get("token");

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//   // Password strength calculation
//   const getPasswordStrength = (password: string) => {
//     let score = 0;
//     if (password.length >= 8) score += 25;
//     if (password.match(/[a-z]/)) score += 25;
//     if (password.match(/[A-Z]/)) score += 25;
//     if (password.match(/[0-9]/)) score += 25;
//     if (password.match(/[^a-zA-Z0-9]/)) score += 25;
//     return Math.min(score, 100);
//   };

//   const getStrengthColor = (strength: number) => {
//     if (strength < 25) return "#f44336";
//     if (strength < 50) return "#ff9800";
//     if (strength < 75) return "#ffeb3b";
//     return "#4caf50";
//   };

//   const getStrengthText = (strength: number) => {
//     if (strength < 25) return "Weak";
//     if (strength < 50) return "Fair";
//     if (strength < 75) return "Good";
//     return "Strong";
//   };

//   const passwordStrength = getPasswordStrength(password);

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = { password: "", confirmPassword: "" };

//     if (!password.trim()) {
//       newErrors.password = "Password is required";
//       valid = false;
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//       valid = false;
//     }

//     if (password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSuccessMessage("");
//     setErrorMessage("");

//     if (validateForm()) {
//       setIsLoading(true);
//       try {
//         const response = await fetch("https://localhost:7211/api/admin/auth/reset-password", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ token, newPassword: password }),
//         });

//         const data = await response.json();
        
//         if (!response.ok) {
//           throw new Error(data.message || "Something went wrong");
//         }
        
//         setSuccessMessage(data.message || "Password reset successfully.");
//         setPassword("");
//         setConfirmPassword("");
//       } catch (err: any) {
//         setErrorMessage(err.message || "Failed to reset password.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <Grid container spacing={0} sx={{ height: "100vh" }}>
//       {/* Left side - Image (hidden on small screens) */}
//       <Grid
//         item
//         xs={0}
//         md={6}
//         sx={{
//           display: { xs: "none", md: "block" }, 
//           flexGrow:1,
//         }}
//       >
//         <UserLeftImage
//           imageSrc={ResetPassword}
//           altText="Reset Password Page Image"
//         />
//       </Grid>

//       {/* Right side - Form */}
//       <Grid
//         item
//         xs={12}
//         md={6}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: { xs: 2, md: 3 },
//           position: "relative",
//           flexGrow: 1,
          
//           // Background changes based on screen size
//           background: {
//             xs: "linear-gradient(135deg, #023E8A 0%, #0077B6 50%, #00B4D8 100%)", // Gradient background for small screens
//             md: "transparent" // Transparent for larger screens
//           },
          
//           // Optional: Add some styling for better mobile experience
//           minHeight: "100vh",
          
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
//         <Box
//           sx={{
//             position: "absolute",
//             top: -50,
//             right: -50,
//             width: 200,
//             height: 200,
//             borderRadius: "50%",
//             background: "linear-gradient(45deg, #023E8A20, #0277BD20)",
//             zIndex: 0,
//             display: { xs: "none", md: "block" }, // Hide decorative element on mobile
//           }}
//         />
        
//         <Box sx={{ textAlign: "center", mb: 4, position: "relative", zIndex: 1 }}>
//           <Slide direction="down" in timeout={600}>
//             <img
//               src={Logo}
//               alt="Logo"
//               style={{ 
//                 maxWidth: isMobile ? "80px" : isTablet ? "110px" : "130px", 
//                 height: isMobile ? "80px" : isTablet ? "110px" : "130px",
//                 filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
//               }}
//             />
//           </Slide>
//         </Box>
        
//         <Fade in timeout={800}>
//           <Paper
//             elevation={24}
//             sx={{
//               padding: { xs: 2, sm: 3, md: 2 },
//               borderRadius: 4,
//               background: "rgba(255, 255, 255, 0.95)",
//               width: "100%",
//               maxWidth: { xs: "350px", sm: "400px", md: "420px" },
//               position: "relative",
//               zIndex: 1,
//             }}
//           >
//             <Slide direction="down" in timeout={600}>
//               <Box sx={{ textAlign: "center", mb: 3 }}>
//                 <Typography
//                   variant="h4"
//                   sx={{
//                     fontWeight: 700,
//                     background: "linear-gradient(135deg, #023E8A, #0466C8)",
//                     backgroundClip: "text",
//                     WebkitBackgroundClip: "text",
//                     color: "transparent",
//                     mb: 1,
//                     fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
//                   }}
//                 >
//                   Set New Password
//                 </Typography>
                
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: "rgba(0, 0, 0, 0.6)",
//                     fontSize: { xs: "12px", sm: "13px", md: "14px" },
//                     lineHeight: 1.5,
//                     px: { xs: 1, sm: 0 },
//                   }}
//                 >
//                   Your new password must be different from previously used passwords.
//                 </Typography>
//               </Box>
//             </Slide>

//             <Slide direction="up" in timeout={800}>
//               <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
//                 <TextField
//                   label="New Password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   error={!!errors.password}
//                   helperText={errors.password}
//                   placeholder="Enter your new password"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon sx={{ color: "#023E8A" }} />
//                         <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
//                       </InputAdornment>
//                     ),
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() => setShowPassword(!showPassword)}
//                           edge="end"
//                         >
//                           {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                   fullWidth
//                   sx={{
//                     mb: { xs: 1.5, sm: 2 },
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: 2,
//                       "&:hover .MuiOutlinedInput-notchedOutline": {
//                         borderColor: "#023E8A",
//                       },
//                       "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                         borderColor: "#023E8A",
//                       },
//                     },
//                   }}
//                 />

//                 {password && (
//                   <Fade in timeout={300}>
//                     <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
//                       <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                         <Typography 
//                           variant="caption" 
//                           sx={{ 
//                             color: "rgba(0, 0, 0, 0.6)", 
//                             mr: 1,
//                             fontSize: { xs: "0.7rem", sm: "0.75rem" }
//                           }}
//                         >
//                           Password strength:
//                         </Typography>
//                         <Chip
//                           label={getStrengthText(passwordStrength)}
//                           size="small"
//                           sx={{
//                             backgroundColor: getStrengthColor(passwordStrength),
//                             color: "white",
//                             fontSize: { xs: "9px", sm: "10px" },
//                             height: { xs: "18px", sm: "20px" },
//                           }}
//                         />
//                       </Box>
//                       <LinearProgress
//                         variant="determinate"
//                         value={passwordStrength}
//                         sx={{
//                           height: 4,
//                           borderRadius: 2,
//                           backgroundColor: "rgba(0, 0, 0, 0.1)",
//                           "& .MuiLinearProgress-bar": {
//                             backgroundColor: getStrengthColor(passwordStrength),
//                             borderRadius: 2,
//                           },
//                         }}
//                       />
//                     </Box>
//                   </Fade>
//                 )}

//                 <TextField
//                   label="Confirm Password"
//                   type={showConfirmPassword ? "text" : "password"}
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   error={!!errors.confirmPassword}
//                   helperText={errors.confirmPassword}
//                   placeholder="Confirm your new password"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon sx={{ color: "#023E8A" }} />
//                         <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
//                       </InputAdornment>
//                     ),
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           edge="end"
//                         >
//                           {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                   fullWidth
//                   sx={{
//                     mb: { xs: 2, sm: 3 },
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: 2,
//                       "&:hover .MuiOutlinedInput-notchedOutline": {
//                         borderColor: "#023E8A",
//                       },
//                       "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                         borderColor: "#023E8A",
//                       },
//                     },
//                   }}
//                 />

//                 {successMessage && (
//                   <Fade in timeout={300}>
//                     <Alert
//                       icon={<CheckCircleIcon />}
//                       severity="success"
//                       sx={{
//                         mb: { xs: 1.5, sm: 2 },
//                         borderRadius: 2,
//                         fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                         "& .MuiAlert-icon": {
//                           color: "#4caf50",
//                         },
//                       }}
//                     >
//                       {successMessage}
//                     </Alert>
//                   </Fade>
//                 )}

//                 {errorMessage && (
//                   <Fade in timeout={300}>
//                     <Alert
//                       icon={<ErrorIcon />}
//                       severity="error"
//                       sx={{
//                         mb: { xs: 1.5, sm: 2 },
//                         borderRadius: 2,
//                         fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                         "& .MuiAlert-icon": {
//                           color: "#f44336",
//                         },
//                       }}
//                     >
//                       {errorMessage}
//                     </Alert>
//                   </Fade>
//                 )}

//                 <Button
//                   type="submit"
//                   variant="contained"
//                   disabled={isLoading}
//                   sx={{
//                     height: { xs: 45, sm: 48, md: 50 },
//                     width: "100%",
//                     borderRadius: 2,
//                     background: "linear-gradient(135deg, #023E8A, #0466C8)",
//                     boxShadow: "0 8px 20px rgba(2, 62, 138, 0.3)",
//                     fontSize: { xs: "14px", sm: "15px", md: "16px" },
//                     fontWeight: 600,
//                     textTransform: "none",
//                     "&:hover": {
//                       background: "linear-gradient(135deg, #022E6A, #0353A4)",
//                       transform: "translateY(-2px)",
//                       boxShadow: "0 12px 30px rgba(2, 62, 138, 0.4)",
//                     },
//                     "&:disabled": {
//                       background: "rgba(0, 0, 0, 0.12)",
//                     },
//                     transition: "all 0.3s ease",
//                   }}
//                 >
//                   {isLoading ? "Resetting..." : "Reset Password"}
//                 </Button>

//                 <Box sx={{ textAlign: "center", mt: { xs: 2, sm: 3 } }}>
//                   <Link to="/admin/login" style={{ textDecoration: "none" }}>
//                     <Button
//                       startIcon={<ArrowBackIcon />}
//                       sx={{
//                         color: "#023E8A",
//                         fontWeight: 600,
//                         textTransform: "none",
//                         fontSize: { xs: "13px", sm: "14px" },
//                         "&:hover": {
//                           backgroundColor: "rgba(2, 62, 138, 0.05)",
//                         },
//                       }}
//                     >
//                       Go back to login
//                     </Button>
//                   </Link>
//                 </Box>
//               </Box>
//             </Slide>
//           </Paper>
//         </Fade>
//       </Grid>
//     </Grid>
//   );
// }

// export default AdminResetPassword;