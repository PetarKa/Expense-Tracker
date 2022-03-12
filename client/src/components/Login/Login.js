import {React,useState} from "react";
import useForm from "./useForm";
import "./style.css";
import Axios from 'axios'
import { useNavigate } from "react-router-dom"


    const Login = (props) => {

        let navigate = useNavigate();
        const {handleChange, values} = useForm();
        
        const [loginStatus, setLoginStatus] = useState("")

        const login = (e) => {
            Axios.post("http://localhost:3001/login", {
                username: e.target.username.value,
                password: e.target.password.value
            }).then((response) => {

                if (response.data.isLoginGood) {
                    props.authorize();
                    navigate(`/secondpage/${e.target.username.value}/${response.data.id}`)
                } else {
                    setLoginStatus("Wrong username/password")
                }
            })
            e.preventDefault();
        }
        
        return (
        
            <div className="base-container">
                <div className="header">Login</div>
                    <form className="form"  onSubmit={login}>
                        <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username" value={values.username} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password" value={values.password} onChange={handleChange}/>
                        </div>
                        <div>{loginStatus}</div>
                        <div className="footer">
                           <button type="submit" className="btn" >Login</button>
                         </div>
                </form>
                <div className="footer" >
                    <p onClick={props.onClick}> 
                        Sign Up
                    </p>
                </div>  
            </div>
            
  
        );
    };


export default Login;






// // export class Login extends React.Component{
// //     constructor(props){
// //         super(props);
// //     }




//     render ()
//     {

//         // const FormSignup = () => {
//         //     const {handleChange, values} = useForm();
//         // }

//         return (
//             <div className="base-container">
//                 <div className="header">Login</div>
//                 <div className="content">
//                     <div className="form">
//                         <div className="form-group">
//                         <label hrmlFor="username">Username</label>
//                         <input type="text" name="username" placeholder="username" />
//                         </div>
//                         <div className="form-group">
//                         <label hrmlFor="password">Password</label>
//                         <input type="password" name="password" placeholder="password" />
//                         </div>
//                      </div>
//                 </div>
//                 <div className="footer">
//                     <button type="button" className="btn">Login</button>
//                 </div>
//                 <div className="footer">
//                     <p> 
//                         <a  href='./Register'>Sign Up</a>
//                     </p>
//                 </div>  
//             </div>
            
  
//         )
//     }
// }