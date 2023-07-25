// ./utils/expenses.js

const saveExpenseStatement = (expenses) => {
    // Generate the expense statement here
    const expenseStatement = generateExpenseStatement(expenses);
  
    // Simulate downloading the statement by creating a data URL
    const dataUrl = createDataUrl(expenseStatement);
  
    // Trigger the download
    downloadFile(dataUrl, 'expense_statement.csv');
  };
  
  const generateExpenseStatement = (expenses) => {
    // Convert the expenses data into a CSV string
    let csv = 'Description,Amount,Date\n';
    expenses.forEach((expense) => {
      csv += `${expense.description},${expense.amount},${expense.date}\n`;
    });
    return csv;
  };
  
  const createDataUrl = (data) => {
    const blob = new Blob([data], { type: 'text/csv' });
    return URL.createObjectURL(blob);
  };
  
  const downloadFile = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };
  
  export { saveExpenseStatement };
  