import React, { useState, useEffect } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [rewardPoints, setRewardPoints] = useState([]);

  useEffect(() => {
    // Simulate an asynchronous API call to fetch data (replace with your actual API call)
    const fetchData = async () => {
      // Replace this with your API endpoint or mock data
      const response = await fetch('https://your-api-endpoint.com/transactions');
      const data = await response.json();
      setTransactions(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate reward points for each transaction and store them in rewardPoints state
    const calculateRewardPoints = (transaction) => {
      const amountOver100 = Math.max(0, transaction.amount - 100);
      const amountBetween50And100 = Math.min(50, Math.max(0, transaction.amount - 50));
      return amountOver100 * 2 + amountBetween50And100;
    };

    const calculateTotalRewardPoints = (customerTransactions) => {
      return customerTransactions.reduce((totalPoints, transaction) => {
        return totalPoints + calculateRewardPoints(transaction);
      }, 0);
    };

    // Group transactions by month and calculate reward points for each customer
    const groupedByMonth = {};
    transactions.forEach((transaction) => {
      const month = transaction.date.getMonth(); // Assuming date field exists in your data
      const customer = transaction.customer; // Replace with the actual field that identifies customers
      if (!groupedByMonth[month]) {
        groupedByMonth[month] = {};
      }
      if (!groupedByMonth[month][customer]) {
        groupedByMonth[month][customer] = [];
      }
      groupedByMonth[month][customer].push(transaction);
    });

    // Calculate and store reward points per customer per month
    const rewardPointsData = [];
    for (const month in groupedByMonth) {
      const monthData = groupedByMonth[month];
      for (const customer in monthData) {
        const customerTransactions = monthData[customer];
        const totalPoints = calculateTotalRewardPoints(customerTransactions);
        rewardPointsData.push({
          month: parseInt(month, 10) + 1, // Months are 0-indexed in JavaScript, so add 1
          customer,
          totalPoints,
        });
      }
    }

    setRewardPoints(rewardPointsData);
  }, [transactions]);

  return (
    <div>
      <h1>Reward Points Calculation</h1>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Customer</th>
            <th>Total Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {rewardPoints.map((entry, index) => (
            <tr key={index}>
              <td>{entry.month}</td>
              <td>{entry.customer}</td>
              <td>{entry.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
