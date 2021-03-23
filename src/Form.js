import {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Form = () => {

    const [nameEntry, setNameEntry] = useState('');
    const [email, setEmail] = useState('');
    const [dateNotSelected, setDateNotSelected] = useState(true)
    const [aboutYou, setAboutYou] = useState('');
    const [reasonForApplication, setReasonForApplying] = useState('');
    const [whatYouThink, setWhatYouThink] = useState('');
    const [dateValue, onChange] = useState(new Date());
    const [file, setFile]= useState('');
    const [submitted, setSubmitted] = useState('');
    
    const dateSet = () =>{ 
        
        let checkBoxOn 
        checkBoxOn = document.querySelector('#dateSelect:checked');

        if(!checkBoxOn){
            setDateNotSelected(true)
        }            
        else if (checkBoxOn){
            setDateNotSelected(false)                 
        }             
                
    }   

    const handleSubmit = (e) =>{
        e.preventDefault()   
        let allDataEntered = false     
        allDataEntered = nameEntry && email && dateValue && !dateNotSelected && aboutYou && reasonForApplication && whatYouThink              
        if(allDataEntered){
            let formData = { nameEntry, email, dateValue, aboutYou, reasonForApplication, whatYouThink, file }
        
            fetch('http://localhost:8080/formData', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
                })            
                .then(() => {
                console.log("Submitted");
                setSubmitted(true);                
                }) 
                .catch((err)=>{
                    console.log(err);
                })
        }  
        else{
                let checkBoxOn = false;
                checkBoxOn = document.querySelector('#dateSelect:checked');

                if(checkBoxOn){
                    setDateNotSelected(false)
                }            
                else if (!checkBoxOn){
                    setDateNotSelected(true)                 
                }
        }    
    }    

    return ( 
        <div className="create">
            
            <h2>Pavers JavaScript Developer Application Form</h2>
            
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                
                <label>Name:</label>
                <input required type="text" maxLength="50" value={nameEntry} onChange={(e) => setNameEntry(e.target.value)}/>
                
                <label>Email address:</label>
                <input required type="email" maxLength="100" value={email} onChange={(e) => setEmail(e.target.value)}/>
                
                <div className="dateContainer">
                    <div className="date">                    
                        <Calendar required onChange={onChange} value={dateValue}/> 
                    </div>
                    <div>
                        <h5>Confirm Date Selection:</h5>
                        <input onChange={dateSet} type="checkbox" id ="dateSelect" value={dateNotSelected} />                
                    </div>
                    <div>
                        {dateNotSelected ? <h3 className="dateSelectRequest">Please Select a Date</h3> : null}
                    </div>
                </div>      

                <label>About You:</label>                
                <textarea required type="text" maxLength="255" value={aboutYou} onChange={(e) => setAboutYou(e.target.value)}></textarea>
                
                <label>Reason for Applying:</label>                
                <textarea required type="text" maxLength="255" value={reasonForApplication} onChange={(e) => setReasonForApplying(e.target.value)}></textarea>
                
                <label>What You Think About Pavers:</label>                
                <textarea required type="text" maxLength="255" value={whatYouThink} onChange={(e) => setWhatYouThink(e.target.value)}></textarea>  
                
                <label>Upload Picture</label>
                <input type="file" id="myFile" value={file} onChange={(e) => setFile(e.target.value)}/>                       
                
                <div>
                    {submitted ? <h3>Submitted</h3> : null} 
                </div>
                
                <button className="button" type="submit">Submit</button>
            
            </form>
            
        </div>

     );
}
 
export default Form;