import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './allcss/dashboard.css'
import { getExpenseApi, getToken, getIncomeApi } from '../services/api';
import { useNavigate } from "react-router-dom";
import { yt, rupee, bitcoin, book, calender, card, circle, clothing, comment, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users } from '../utils/icons';
import moment from 'moment'

function displayCategoryIcon(income) {
  let categoryIcon;
  switch (income.category) {
    case 'salary':
      categoryIcon = money;
      break;
    case 'freelancing':
      categoryIcon = freelance;
      break;
    case 'investments':
      categoryIcon = stocks;
      break;
    case 'stocks':
      categoryIcon = users;
      break;
    case 'bitcoin':
      categoryIcon = bitcoin;
      break;
    case 'bank':
      categoryIcon = card;
      break;
    case 'youtube':
      categoryIcon = yt;
      break;
    case 'other':
      categoryIcon = piggy;
      break;
    case 'education':
      categoryIcon = book;
      break;
    case 'groceries':
      categoryIcon = food;
      break;
    case 'health':
      categoryIcon = medical;
      break;
    case 'subscriptions':
      categoryIcon = tv;
      break;
    case 'takeaways':
      categoryIcon = takeaway;
      break;
    case 'clothing':
      categoryIcon = clothing;
      break;
    case 'travelling':
      categoryIcon = freelance;
      break;
    default:
      categoryIcon = '';
  }
  return categoryIcon;
}

function Dashboard() {
  const navigation = useNavigate();

  const [list, setList] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [refreshList, setRefreshList] = useState(false);
  const [myCombinedList, setCombinedList] = useState([])
  const [graphCombinedList, setGraphCombinedList] = useState([])
  const [myIncomeArray, setMyIncomeArray] = useState([])
  const [myExpenseArray, setMyExpenseArray] = useState([])

  useEffect(() => {
    if (!getToken()) {
      navigation("/login");
    }
    fetchAllTransactions();
  }, [refreshList, navigation]);

  async function fetchAllTransactions() {
    try {
      const incomeResult = await getIncomeApi();
      const expenseResult = await getExpenseApi();

      if (incomeResult.status === 200 && incomeResult.data.status === 200 &&
        expenseResult.status === 200 && expenseResult.data.status === 200) {
        // Combine income and expense arrays into a single list
        const combinedList = [
          ...incomeResult.data.data.map(income => ({ ...income, label: 'income' })),
          ...expenseResult.data.data.map(expense => ({ ...expense, label: 'expense' })),
        ];
        const combinedList2 = [
          ...incomeResult.data.data.map(income => ({ ...income, label: 'income' })),
          ...expenseResult.data.data.map(expense => ({ ...expense, label: 'expense' })),
        ];

        // Sort the combined list based on the date in descending order (most recent first)
        const sortedData = combinedList.sort((a, b) => new Date(b.date) - new Date(a.date));
        setCombinedList(sortedData);

        const graphdata = combinedList2.sort((a, b) => new Date(a.date) - new Date(b.date));
        setGraphCombinedList(graphdata);

        const top4Data = sortedData.slice(0, 4);
        setList(top4Data);
        console.log("List: ", top4Data);

        const incomeArray = sortedGraphCombinedList
          .filter((transaction) => transaction.label === 'income')
          .map((transaction) => transaction.amount);
        setMyIncomeArray(incomeArray)

        const expenseArray = sortedGraphCombinedList
          .filter((transaction) => transaction.label === 'expense')
          .map((transaction) => transaction.amount);
        setMyExpenseArray(expenseArray)

        // Calculate total income, total expense, and total balance
        const calculatedTotalIncome = combinedList
          .filter((item) => item.label === 'income')
          .reduce((total, income) => total + income.amount, 0);
        setTotalIncome(calculatedTotalIncome);

        const calculatedTotalExpense = combinedList
          .filter((item) => item.label === 'expense')
          .reduce((total, expense) => total + expense.amount, 0);
        setTotalExpense(calculatedTotalExpense);

        const calculatedTotalBalance = calculatedTotalIncome - calculatedTotalExpense;
        setTotalBalance(calculatedTotalBalance);

      } else {
        setList([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setList([]);
    }
  }
  const dateFormat = (date) => {
    return moment(date).format('DD/MM/YYYY')
  }
  const sortedGraphCombinedList = graphCombinedList.sort((a, b) => new Date(a.date) - new Date(b.date));
  return (
    <>
      <div className="alltran">
        <div className="graph">
          <div className="mytransaction">
            <h2 style={{ textAlign: "center" }}>All transactions</h2>
          </div>
          <Line
            data={{
              labels: sortedGraphCombinedList.map((transaction) => dateFormat(transaction.date)),
              datasets: [
                {
                  label: 'Income',
                  data: sortedGraphCombinedList
                    .filter((transaction) => transaction.label === 'income')
                    .map((inc) => ({ x: dateFormat(inc.date), y: inc.amount })),
                  fill: false,
                  backgroundColor: '#6e9f41',
                },
                {
                  label: 'Expense',
                  data: sortedGraphCombinedList
                    .filter((transaction) => transaction.label === 'expense')
                    .map((expense) => ({ x: dateFormat(expense.date), y: expense.amount })),
                  fill: false,
                  backgroundColor: '#ff0000',
                },
              ],
            }}
            options={{
              scales: {
                xAxes: [
                  {
                    type: 'time',
                    time: {
                      parser: 'DD/MM/YYYY',
                      tooltipFormat: 'DD/MM/YYYY',
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Date',
                    },
                  },
                ],
                yAxes: [
                  {
                    beginAtZero: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Amount',
                    },
                  },
                ],
              },
            }}
          />
        </div>


        <div className="graph">
          <div className="mytransaction">
            <h2 style={{ textAlign: "center" }}>Recent History</h2>
          </div>
          {list.length > 0 ? (
            <div className="dashrec">
              {list.map((transaction) => (
                <div key={transaction._id} className="mainincomeitem">
                  <div className='iicategory'>
                    {displayCategoryIcon(transaction)}
                  </div>
                  <div style={{ width: "60%" }}>
                    <div className={transaction.label === "income" ? 'incheading' : 'expheading'}>
                      {transaction.title}
                    </div>
                    <div className="otheritems">
                      <p>{rupee} {transaction.amount}</p>
                      <p>{calender} {new Date(transaction.date).toLocaleDateString('en-GB')}</p>
                      <p style={{ wordWrap: 'break-word' }}>
                        {comment} {transaction.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No transaction data available</div>
          )}
        </div>
      </div>
      <div className="graph">
        <div className="alldisplay">
          <div className="dashtotalincome">
            <h2>Total Income: <span className='mobspan'></span> Rs. <span style={{ color: "#6e9f41" }}>{totalIncome}</span> </h2>
          </div>
          <div className="dashtotalexpense">
            <h2>Total Expense: <span className='mobspan'></span>Rs. <span style={{ color: "#ff0000 " }}>{totalExpense}</span></h2>
          </div>
          <div className="dashtotalbalance">
            <h2>Total Balance: <span className='mobspan'></span> Rs. <span style={{ color: totalBalance <= 0 ? "#ff0000" : "#6e9f41" }}>{totalBalance}</span></h2>
          </div>
        </div>
      </div>
    </>
  )
}
export default Dashboard
