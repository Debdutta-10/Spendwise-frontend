// Import the icons as components
import { yt, rupee, bitcoin, book, calender, card, circle, clothing, comment, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users } from '../utils/icons';
import './allcss/incomeitems.css';
import { toast } from 'react-toastify';
import { deleteIncomeApi } from '../services/api';
import { useState } from 'react';

function IncomeItem({ income, setRefreshList }) {
    const formattedDate = new Date(income.date).toLocaleDateString('en-GB');

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

    // Determine which icon to display based on the category
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

    return (
        <>
            <div className="mainincomeitem">
                <div className='iicategory'>
                    {categoryIcon}
                </div>
                <div style={{ width: "60%" }}>
                    <div className="incheading">
                        {income.title}
                    </div>
                    <div className="otheritems">
                        <p>{rupee} {income.amount}</p>
                        <p>{calender} {formattedDate}</p>
                        <p style={{ wordWrap: 'break-word' }}>
                            {comment} {income.description}
                        </p>
                    </div>
                </div>
                <div>
                    <button className='iibutton' onClick={handleDelete}>{trash}</button>
                </div>
            </div>
        </>
    );
}

export default IncomeItem;
