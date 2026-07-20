import React , {FormEvent , useState} from "react";
import {signUpUser} from "../services/authService";

//making the signUp Funciton
function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [countryOforigin, setCountryOforigin] = useState("");
    const [phoneNumb, setPhoneNumb] = useState("");

//     a function that will create the account once someone hits the submit button
    async function handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            setLoading(true);
            await signUpUser(
                {
                    name,
                    email,
                    password,
                    countryOfOrigin: countryOforigin,
                    phoneNumber: phoneNumb
                }
        )

        ;

//     sending an alert if the account is being created:
        alert("Account has been created succesfully");
//     setting all the values to none now:
        setName("");
        setEmail("");
        setPhoneNumb("");
        setPassword("");
        setCountryOforigin("");
    } catch(error) {
            const errorMessage = error instanceof Error?
                error.message :"Somethign really terrible happened";
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
}




//     things which will be rendured on the page:
    return (
        <div>
            <div className="Page_Heading">
                <h1>Create account or sign in </h1>
            </div>
            
        {/*    now, making the form whcih will be displayed*/}

            <form onSubmit={handleSubmit}>
                <input type="text"
                placeholder="full name"
                value = {name}
                onChange={(event)=> setName(event.target.value)}
                required/>

                <input type="text"
                placeholder="Enter your  email"
                value = {email}
                onChange={(event)=>setEmail(event.target.value)}
                required/>

                <input type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event)=> setPassword(event.target.value)}
                required
                />

                <input type="text"
                placeholder="Type message"
                value={message}
                onChange={(event)=>setMessage(event.target.value)}
                required/>

                <input type="text"
                placeholder="Country of origin"
                value={countryOforigin}
                onChange={(event)=> setCountryOforigin(event.target.value)}
                required/>

                <input type="tel"
                placeholder="phone number"
                value={phoneNumb}
                onChange={(event)=>setPhoneNumb(event.target.value)}
                required/>
            {/*    adding a button helping to submit the form*/}
                <button type="submit" disabled={loading}>
                    {loading? "creating account ...":"create account"}
                </button>
            </form>
        </div>
    )

}

export default SignUp;