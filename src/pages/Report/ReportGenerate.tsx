
import { Box } from "@mui/material";
import Header from "../../components/header/header";
import  CustomDatePicker from "../../components/ReportComponents/DatePicker";




function ReportGenerate() {
   // const [reportDate,setReportData]=useState<any>([]);
   return (
     
       <Box
       sx={{
         p:3
       }}>
         <Header pageName="Craft Your Custom Report"/>
         <CustomDatePicker />
       </Box>
   );
     
}

export default ReportGenerate;
