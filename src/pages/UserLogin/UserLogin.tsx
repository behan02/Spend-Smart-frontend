// import {
//     Box,
//     Button,
//     Divider,
//     Grid,
//     InputAdornment,
//     ListItem,
//     TextField,
//   } from "@mui/material";
// import userLoginImage from "../../assets/images/userLogin.png";
// import MailIcon from '@mui/icons-material/MailOutline';
// import LockIcon from "@mui/icons-material/LockOutlined";
 
  
//   function UserLogin() {
//     return (
//       <div>
//         <Grid container spacing={2} sx={{ height: "100vh" }}>
//           <Grid
//             item
//             xs={12}
//             md={6}
//             sx={{
//               backgroundColor: "#023E8A",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <img
//               src={userLoginImage}
//               alt="Login"
//               style={{ maxWidth: "500px", height: "500px" }}
//             />
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             md={6}
//             sx={{
//               alignItems: "center",
//               justifyContent: "center",
//               justifyItems: "center",
//               marginTop: "150px",
//             }}
//           >
//             <Box
//               sx={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 textAlign: "center",
//               }}
//             >
//               <h1 style={{ marginBottom: 0 }}>Welcome Back!</h1>
//               <p style={{ marginTop: 0, marginBottom: "30px" }}>
//                 Let’s make managing your finances easy and stress-free.
//               </p>
//             </Box>
  
//             <ListItem
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <form>
//                 <TextField
//                   id="outlined-textarea"
//                   label="Email"
//                   placeholder="Enter your Email"
//                   multiline
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <MailIcon />{" "}
//                         <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     width: "300px",
//                   }}
//                 />
//                 <br />
//                 <br />
//                 <br />
  
//                 <TextField
//                   id="outlined-textarea"
//                   label="Password"
//                   placeholder="**********"
//                   multiline
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon />{" "}
//                         <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     width: "300px",
//                   }}
//                 />
//                 <br />
//                 <br />
//                 <br />
  
//                 <Button
//                   variant="contained"
//                   sx={{
//                     alignItems: "center",
//                     justifyContent: "center",
//                     height: "45px",
//                     width: "300px",
//                     backgroundColor: "#023E8A",
//                   }}
//                 >
//                   Login
//                 </Button>
//                 <br />
//                 <br />
//                 <p
//                   style={{
//                     marginTop: "1rem",
//                     fontSize: "0.9rem",
//                     alignItems: "center",
//                     textAlign: "center",
//                     fontSizeAdjust: "25px",
//                   }}
//                 >
//                   Don’t have an account yet?{" "}
//                   <a
//                     style={{
//                       color: "#1976d2",
//                       textDecoration: "none",
//                       opacity: "50%",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Sign up here
//                   </a>
//                 </p>
//               </form>
//             </ListItem>
//           </Grid>
//         </Grid>
//       </div>
//     );
//   }
  
//   export default UserLogin;
  