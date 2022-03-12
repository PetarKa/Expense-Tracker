import { React, useState } from "react";
import useForm from "./useForm";
import "./style.css";
import Axios from 'axios'


const Register = (props) => {

    const { handleChange, values } = useForm();
    const [registerStatus, setRegisterStatus] = useState("")

    const register = (e) => {

        Axios.post("http://localhost:3001/register", {// sending userReg i passwReg
            username: e.target.username.value,
            password: e.target.password.value
        }).then((response) => {
            if (response.data === false) {
                setRegisterStatus("User already exists")
            }
            else {
                setRegisterStatus("You registered")
            }
        })
        e.preventDefault();
    }


    return (
        <div className="base-container">
            <div className="header">Register</div>
            <form className="form" onSubmit={register}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="username" value={values.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="password" value={values.password} onChange={handleChange} />
                </div>
                <div>{registerStatus}</div>
                <div className="footer">
                    <button type="submit" className="btn" >Register</button>
                </div>
            </form>
            <div className="footer" >
                <p onClick={props.onClickSec}>
                    Sign Up
                </p>
            </div>
        </div>


    );
};


export default Register;