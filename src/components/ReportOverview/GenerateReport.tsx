import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'


function GenerateReport() {
  const navigate = useNavigate()
  const handleGenerateReport = () => {
    
    console.log("Generating report...")
   
    navigate("/reportGenerate")
  }
  return (
<Button
      variant="contained"
      color="primary"
      onClick={handleGenerateReport}
      sx={{
        mt: 2,
        borderRadius: "10px",
        px: { xs: 2, sm: 3 },
        py: { xs: 1, sm: 1.5 },
        fontSize: { xs: ".5rem", md: ".9rem" } // Set directly here
      }}
    >
      Generate Report
    </Button>

  )
}

export default GenerateReport
