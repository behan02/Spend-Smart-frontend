import React from 'react'
import Button from '@mui/material/Button'


function GenerateReport() {
  return (
    <Button
  variant="contained"
  color="primary"
  sx={{
    mt: 2,
    borderRadius: "10px",
    px: { xs: 2, sm: 3 },
    py: { xs: 1, sm: 1.5 },
    fontSize: { xs: "1.5rem", md: "2.5rem" } // Set directly here
  }}
>
  Generate Report
</Button>

  )
}

export default GenerateReport
