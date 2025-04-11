import React from "react";
import Header from "../components/GoalDetailsPageComponents/Header";
import GoalProgressCircle from "../components/GoalDetailsPageComponents/GoalProgressCircle";
import SavingsChart from "../components/GoalDetailsPageComponents/SavingsChart";
import SavingsHistoryTable from "../components/GoalDetailsPageComponents/SavingsHistoryTable";
import AddSavingRecordModal from "../components/GoalDetailsPageComponents/AddSavingRecordModal";
import BackButton from "../components/GoalDetailsPageComponents/BackButton";
import { Box, Container } from "@mui/material";

const GoalDetailsPage: React.FC = () => {
  return (
    <Container maxWidth="tablet">
      {/* Header */}
      <Header title="Goal Details" />

      {/* Progress Circle */}
      <Box textAlign="center" mt={3}>
        <GoalProgressCircle percentage={75} />
      </Box>

      {/* Savings Chart */}
      <Box mt={4}>
        <SavingsChart />
      </Box>

      {/* Savings History Table */}
      <Box mt={4}>
        <SavingsHistoryTable />
      </Box>

      {/* Add Savings Record */}
      <Box mt={4} textAlign="center">
        <AddSavingRecordModal />
      </Box>

      {/* Back Button */}
      <Box mt={3}>
        <BackButton />
      </Box>
    </Container>
  );
};

export default GoalDetailsPage;