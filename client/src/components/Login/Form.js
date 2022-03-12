import React, { useState } from "react";
import Login from './Login';
import Register from './Register';


const Form = (props) => {

    const [isClicked, setIsClicked] = useState(false);

    function onClick() {
        setIsClicked(true);
    }

    function onClickSec() {
        setIsClicked(false);
    }

    return (

        <div>
            {!isClicked ? <Login onClick={onClick} authorize={props.authorize} /> : <Register onClickSec={onClickSec} />}
        </div>
    )

}
export default Form;