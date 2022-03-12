import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import Axios from "axios";
import { useParams } from "react-router-dom";


function SecondPage(props) {
    let navigate = useNavigate();
    let { username } = useParams();
    let { id } = useParams()

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        let isMounted = !props.authorize
        if (isMounted) {
            navigate("/")
        } else {
            Axios.get("http://localhost:3001/data", { params: { username: username } }).then((response) => {

                let newData = response.data;
                newData.forEach((el) => {//pretvara mysql date u js new date
                    el.date = new Date(el.date)
                })

                setExpenses(newData)
            })
        }
        return () => {
            isMounted = false;
        }
    }, [])

    let clickHandle = () => {
        navigate("/")
    }


    const addExpenseHandler = (expense) => {

        Axios.post("http://localhost:3001/data", {
            title: expense.title,
            amount: expense.amount,
            date: expense.date.toISOString().split("T")[0],
            userID: parseInt(id)
        }).then((response) => {

            setExpenses((prevExpenses) => {
                const expenseData = {
                    ...expense,
                    id: response.data.id
                }
                return [expenseData, ...prevExpenses];
            });
        })
    };

    return (
        <div>
            <button className="logout btn" onClick={clickHandle}>Logout</button>
            <NewExpense onAddExpense={addExpenseHandler} />
            <Expenses items={expenses} />
        </div>
    )
}

export default SecondPage