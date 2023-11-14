import React, { useState, useEffect } from 'react';
import './allcss/income.css';
import { add } from '../utils/icons';
import { ToastContainer, toast } from "react-toastify";
import { addIncomeApi, getIncomeApi, getToken } from '../services/api';
import { useNavigate } from "react-router-dom";
import { deleteIncomeApi } from '../services/api';
import { yt, rupee, bitcoin, book, calender, card, circle, clothing, comment, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users } from '../utils/icons';


function Income() {
    const navigation = useNavigate();
    const [incomeForm, setIncomeForm] = useState({
        title: "",
        amount: "",
        category: "",
        description: "",
        date: "",
    });

    const [list, setList] = useState([]);
    const [refreshList, setRefreshList] = useState(false);


    useEffect(() => {
        if (!getToken()) {
            navigation("/login");
        }
        fetchAllIncomes();
    }, [refreshList, navigation]);


    const handleChange = (e) => {
        setIncomeForm({ ...incomeForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (incomeForm.amount.length === 0 || incomeForm.amount <= 0) {
            toast("Amount is Required");
            return;
        }

        try {
            const result = await addIncomeApi({
                title: incomeForm.title,
                amount: incomeForm.amount,
                category: incomeForm.category,
                description: incomeForm.description,
                date: incomeForm.date,
            });

            if (result.status === 200 && result.data.status === 200) {
                toast("Income Added");
                setIncomeForm({
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
            console.error("Error submitting income:", error);
            toast("Error submitting income");
        }
    };

    async function fetchAllIncomes() {
        try {
            const result = await getIncomeApi();
            if (result.status === 200 && result.data.status === 200) {
                setList(result.data.data); // Update to use result.data.data directly
                console.log("List: ", result.data.data);
            } else {
                setList([]); // Set an empty array if there is no data
            }
        } catch (error) {
            console.error("Error fetching incomes:", error);
            setList([]); // Set an empty array on error
        }
    }

    const handleDelete = async (income) => {
        const result = await deleteIncomeApi({
            _id: income._id
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
            default:
                categoryIcon = '';
        }
        return categoryIcon;
    }

    const totalIncome = list.reduce((total, income) => total + income.amount, 0);

    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="totalincome">
            <h2>Total Income:<span className='mobspan'></span> Rs. <span style={{ color: "#6e9f41" }}> {totalIncome}</span></h2>
            </div>
            <div className="mci">
                <div className="form">
                    <input
                        className="fi"
                        type="text"
                        name="title"
                        placeholder="Salary Title"
                        value={incomeForm.title}
                        onChange={handleChange}
                    />
                    <input
                        className="fi"
                        type="text"
                        name="amount"
                        placeholder="Salary Amount"
                        value={incomeForm.amount}
                        onChange={handleChange}
                    />
                    <input
                        className="fi"
                        type="date"
                        name="date"
                        placeholder="Enter A Date"
                        value={incomeForm.date}
                        onChange={handleChange}
                    />
                    <select name="category" value={incomeForm.category} onChange={handleChange}>
                        <option value="" disabled>Select Option</option>
                        <option value="salary">Salary</option>
                        <option value="freelancing">Freelancing</option>
                        <option value="investments">Investiments</option>
                        <option value="stocks">Stocks</option>
                        <option value="bitcoin">Bitcoin</option>
                        <option value="bank">Bank Transfer</option>
                        <option value="youtube">Youtube</option>
                        <option value="other">Other</option>
                    </select>
                    <textarea
                        cols={30}
                        rows={4}
                        name="description"
                        value={incomeForm.description}
                        onChange={handleChange}
                        placeholder="Add a Reference"
                    ></textarea>
                    <button className="incomebut" onClick={handleSubmit}>
                        {add} Add Income
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
                                    <div className="incheading">
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
                    <div>No income data available</div>
                )}
            </div>
        </>
    );
};
export default Income;
