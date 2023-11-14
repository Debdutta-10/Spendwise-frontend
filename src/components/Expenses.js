import React, { useState, useEffect } from 'react';
import './allcss/income.css';
import { add } from '../utils/icons';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addExpenseApi, getExpenseApi, deleteExpenseApi, getToken } from '../services/api';
import { yt, rupee, bitcoin, book, calender, card, circle, clothing, comment, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users } from '../utils/icons';

function Expenses() {
  const navigation = useNavigate();
  const [expenseForm, setExpenseForm] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: '',
  });

  const [list, setList] = useState([]);
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      navigation("/login");
    }
    fetchAllExpense();
  }, [refreshList, navigation]);

  const handleChange = (e) => {
    setExpenseForm({ ...expenseForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (expenseForm.amount.length === 0 || expenseForm.amount <= 0) {
      toast("Amount is Required");
      return;
    }

    try {
      const result = await addExpenseApi({
        title: expenseForm.title,
        amount: expenseForm.amount,
        category: expenseForm.category,
        description: expenseForm.description,
        date: expenseForm.date,
      });

      if (result.status === 200 && result.data.status === 200) {
        toast("Expense Added");
        setExpenseForm({
          title: "",
          amount: "",
          category: "",
          description: "",
          date: "",
        });
        setRefreshList(true);
      } else {
        toast(result.data.message);
      }
    } catch (error) {
      console.error("Error submitting Expense:", error);
      toast("Error submitting Expense");
    }
  };


  async function fetchAllExpense() {
    try {
      const result = await getExpenseApi();
      if (result.status === 200 && result.data.status === 200) {
        setList(result.data.data);
        console.log("List: ", result.data.data);
      } else {
        setList([]);
      }
    } catch (error) {
      console.error("Error fetching incomes:", error);
      setList([]);
    }
  }

  const handleDelete = async (expense) => {
    const result = await deleteExpenseApi({
      _id: expense._id
    });
    console.log('delete result', result);

    if (result.data.status === 200) {
      setRefreshList(new Date());
      toast('Deleted');
    } else {
      toast('Failed to delete');
    }
  }

  function displayCategoryIcon(income) {
    let categoryIcon;
    switch (income.category) {
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
      case 'other':
        categoryIcon = circle;
        break;
      default:
        categoryIcon = '';
    }
    return categoryIcon;
  }

  const totalExpense = list.reduce((total, expense) => total + expense.amount, 0);
  return (
    <>
      <ToastContainer />
      <div className="totalincome">
        <h2>
          Total Expense: <span className='mobspan'>Rs. <span style={{ color: '#ff0000' }}> {totalExpense}</span></span>
        </h2>
      </div>

      <div className="mci">
        <div className="form">
          <input
            className="fi"
            type="text"
            name="title"
            placeholder="Expense Title"
            value={expenseForm.title}
            onChange={handleChange}
          />
          <input
            className="fi"
            type="text"
            name="amount"
            placeholder="Expense Amount"
            value={expenseForm.amount}
            onChange={handleChange}
          />
          <input
            className="fi"
            type="date"
            name="date"
            placeholder="Enter A Date"
            value={expenseForm.date}
            onChange={handleChange}
          />
          <select name="category" value={expenseForm.category} onChange={handleChange}>
            <option value="" disabled>Select Option</option>
            <option value="education">Education</option>
            <option value="groceries">Groceries</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="takeaways">Takeaways</option>
            <option value="clothing">Clothing</option>
            <option value="travelling">Travelling</option>
            <option value="other">Other</option>
          </select>
          <textarea
            cols={30}
            rows={4}
            name="description"
            value={expenseForm.description}
            onChange={handleChange}
            placeholder="Add a Reference"
          ></textarea>
          <button className="incomebut" onClick={handleSubmit}>
            {add} Add Expense
          </button>
        </div>

        {list.length > 0 ? (
          <div className="disincomes">
            {list.map((income) => (
              <div key={income._id} className="mainincomeitem">
                <div className='iicategory'>
                  {displayCategoryIcon(income)}
                </div>
                <div style={{ width: "60%" }}>
                  <div className="expheading">
                    {income.title}
                  </div>
                  <div className="otheritems">
                    <p>{rupee} {income.amount}</p>
                    <p>{calender} {new Date(income.date).toLocaleDateString('en-GB')}</p>
                    <p style={{ wordWrap: 'break-word' }}>
                      {comment} {income.description}
                    </p>
                  </div>
                </div>
                <div>
                  <button className='iibutton' onClick={() => handleDelete(income)}>{trash}</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No Expense data available</div>
        )}
      </div>
    </>
  );
}

export default Expenses;
