import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
 
} from "@mui/material";

interface Transaction {
  date: string;
  category: string;
  amount: string;
  type: 'Income' | 'Expense';
}

interface BasicTableProps {
  data?: Transaction[];
}

const defaultTransactions: Transaction[] = [
  { date: '2/2/24', category: 'Foods', amount: 'LKR 500', type: 'Expense' },
  { date: '3/2/24', category: 'Grocery', amount: 'LKR 300', type: 'Expense' },
  { date: '3/2/24', category: 'Transport', amount: 'LKR 200', type: 'Expense' },
  { date: '4/2/24', category: 'Foods', amount: 'LKR 500', type: 'Income' },
  { date: '4/2/24', category: 'Entertainment', amount: 'LKR 1000', type: 'Expense' }
];

function BasicTable({ data }: BasicTableProps) {
  const transactions = data || defaultTransactions;

  const getTypeColor = (type: string) => {
    return type === 'Income' ? '#4444ff' : '#ff4444';
  };

  return (
    <Card sx={{ p: 2, backgroundColor: '#fff', borderRadius: 2, border: '1px solid #e0e0e0' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '13px' }}>
          Transaction Summary
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, backgroundColor: '#ff4444', borderRadius: '50%' }} />
            <Typography variant="body2" sx={{ fontSize: '10px' }}>Expense</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, backgroundColor: '#4444ff', borderRadius: '50%' }} />
            <Typography variant="body2" sx={{ fontSize: '10px' }}>Income</Typography>
          </Box>
        </Box>
      </Box>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '11px', fontWeight: 'bold', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                Date
              </TableCell>
              <TableCell sx={{ fontSize: '11px', fontWeight: 'bold', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                Category
              </TableCell>
              <TableCell sx={{ fontSize: '11px', fontWeight: 'bold', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                Amount
              </TableCell>
              <TableCell sx={{ fontSize: '11px', fontWeight: 'bold', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index} sx={{ '&:last-child td': { border: 0 } }}>
                <TableCell sx={{ fontSize: '10px', py: 1, border: 'none' }}>
                  {transaction.date}
                </TableCell>
                <TableCell sx={{ 
                  fontSize: '10px', 
                  py: 1, 
                  border: 'none',
                  color: getTypeColor(transaction.type)
                }}>
                  {transaction.category}
                </TableCell>
                <TableCell sx={{ fontSize: '10px', py: 1, border: 'none' }}>
                  {transaction.amount}
                </TableCell>
                <TableCell sx={{ 
                  fontSize: '10px', 
                  py: 1, 
                  border: 'none',
                  color: getTypeColor(transaction.type)
                }}>
                  {transaction.type}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      
     
    </Card>
  );
}

export default BasicTable;