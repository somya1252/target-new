import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      
      },
    },
    h:{
      
      marginBottom: '0',
      textAlign: 'center'
      

    },
    typography: {
        // for settings
        fontSize: 12,
      },
    button: {
        margin: theme.spacing(1),
        borderRadius: "2em",
        
      },
    addicon: {
        color: 'solid white',
    },
}));

const ContentOpenEndedAnswerUser = (props) => {
  const auth = props.auth;
  const history = useHistory();
  const u = props.match.params.id;
  const [resUrl,setResUrl] = useState("");
  const [question,setquestion]=useState({question:""})
  axios.get(`http://localhost:8080/OE/${u}`)
  .then(res=>{
        
        setquestion({question:res.data.question})})
        .catch((error)=>{
          console.log(error)
    })
    useEffect(() => {
      axios.get(`http://localhost:8080/quest/${u}`)
            .then(res => {  
              console.log(res.data)
                      setResUrl(res.data);
            })
    }, [])
  const [OpenEndedAnswer,setOpenEndedAnswer]=useState({latestAnswer:""})
     
    
    const classes = useStyles();
    const url=`http://localhost:8080/responses`
    
    const submit = () => {
     const q ={
        question: u,
        latestAnswer: OpenEndedAnswer.latestAnswer
      }
      console.log(resUrl)
      
                      if(resUrl === ""){
                        axios.post(url, q)
                             .then(res=>{
                                console.log(res.data)
                              })
                      }
                      else{
                        axios.put(`${url}/${resUrl}`, q)
                        .then(res=>{
                            console.log(res.data)
                          })
                      }
                      if (window.confirm('Your response has been successfully submitted. You will now be redirected to the homepage.   To submit another response, click Cancel ')) 
                      {
                      window.location.href='https://targetsynergy.herokuapp.com';
                      };
           
    }
    
    function handle(e){
      const newdata={...OpenEndedAnswer}
      newdata[e.target.id]=e.target.value
      setOpenEndedAnswer(newdata)
      console.log(newdata)

    }
    const uri = `/OE/${u}/results`
    function handleResult(path) {
        history.push(path);
    }
    return (
      <Container className={classes.root} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100%', flexDirection:'column', paddingTop: '5%', width: '50%' }} >
      <form onSubmit={submit} className={classes.root} noValidate autoComplete="off">
        <h1 className={classes.h} style={{fontSize:"30px"}}>{question.question}</h1>
      
     <h3>Write Your Answer Here:</h3>
      <TextField id="outlined-multiline-static" multiline rows={4} label="Your Answer" variant="outlined" size="small" onChange={(e)=>handle(e)} id="latestAnswer" value={OpenEndedAnswer.latestAnswer} type="text" style={{width: '100%'}} />
    
      <div style={{display: 'flex',flexDirection: 'column', width: '100%', justifyContent: 'space-evenly',alignItems: "center"}}>
     <Button
        style={{ width: "40%",background:"#cc0000", color:"white" }}
        className={classes.button}
        variant="contained"
       size="large"
        fullWidth={true}
        onClick={()=>submit()}
      >Submit
      </Button>
      { auth && <Button
        style={{ width: "40%",background:"#cc0000", color:"white"}}
        className={classes.button}
        variant="contained"
        onClick={() => {handleResult(`${uri}`)}}
        size="large"
      
       >View Result
      </Button> } </div>
  
       </form>
      </Container>
      
    );
};


export default ContentOpenEndedAnswerUser