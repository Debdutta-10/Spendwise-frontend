import axios from 'axios';
import {ADD_EXPENSE, ADD_INCOME, DELETE_EXPENSE, DELETE_INCOME, GET_EXPENSE, GET_INCOME, LOGIN, REGISTER} from "./apiConstants";

export const login = async (data) => {
    return axios.post(LOGIN, data);
};

export const register = async (data) => {
    return axios.post(REGISTER, data);
};

export function getToken() {
    let user = localStorage.getItem("user");
    if (!user) return;
    const userObj = JSON.parse(user);
    return userObj.token;
  }

export const addIncomeApi = async (data) => {
    let token = getToken();
    console.log(token,"token data")
    return axios.post(ADD_INCOME,data,{
        headers:{
            auth: token,
        },
    });
};

export const addExpenseApi = async (data) => {
    let token = getToken();
    console.log(token,"token data")
    return axios.post(ADD_EXPENSE,data,{
        headers:{
            auth: token,
        },
    });
};

export const getIncomeApi = async(data)=>{
    let token = getToken();
    console.log(token, "token data");
    return axios.get(GET_INCOME,{
        headers:{
            auth: token,
        },
    });
};
export const getExpenseApi = async(data)=>{
    let token = getToken();
    console.log(token, "token data");
    return axios.get(GET_EXPENSE,{
        headers:{
            auth: token,
        },
    });
};

export const deleteIncomeApi = async (data) => {
    let token = getToken();
    console.log(token, "token data");
    return axios.post(DELETE_INCOME, data, {
      headers: {
        auth: token,
      },
    });
  };
export const deleteExpenseApi = async (data) => {
    let token = getToken();
    console.log(token, "token data");
    return axios.post(DELETE_EXPENSE, data, {
      headers: {
        auth: token,
      },
    });
  };

  