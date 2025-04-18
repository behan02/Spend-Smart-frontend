import { Box } from "@mui/material"
import DashboardOverview from "../../components/dashboardOverview/DashboardOverview"


function ReportDisplay() {
  return (
    <div>
        <Box
        sx={{
            p:4,
            
        }}>
            <DashboardOverview/>
        </Box>
        
      
    </div>
  )
}

export default ReportDisplay
