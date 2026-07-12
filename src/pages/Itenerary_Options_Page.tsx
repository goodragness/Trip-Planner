import react,{ useState , useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function IteneraryOptionsPage(){
    const location = useLocation();
    const navigate =  useNavigate();
    // storing al the ifnromation collected form previous pages.
    const {destination , startDate , endDate , cities , selectedTravelTypes ,
        totalBudget , accomodationBudget , commuteBudget} = location.state|| {};

    // sending all the important data to the backend's endpoint (post route) so that
    // backend can send the data to Groq api and help generate an itenerary.
    useEffect(()=>{
        const fetchitenerary = async() =>{
            try{
                const response = await fetch('http://localhost:5001/api/generate-itenerary' , {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({
                        destination,
                        startDate,
                        endDate ,
                        cities ,
                        selectedTravelTypes ,
                        totalBudget ,
                        accomodationBudget ,
                        commuteBudget
                    })
                });
                const data = await response.json();
                console.log(data);
            }catch{
                console.log("Error generating iteneraries")
            }
        };
        fetchitenerary();
        }, []
    )
    return(
        <div>
            <div className="Page_Heading">
                <h1>Itenerary options</h1>
            </div>
        {/*    now printing the itenerary created by groq
        */}
        </div>
    )
}

export default IteneraryOptionsPage