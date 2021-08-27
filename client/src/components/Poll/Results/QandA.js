import styled, { css } from "styled-components";
import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import randomColor from 'randomcolor'
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      
      },
    },
    h:{
      fontSize: '15px',
      marginBottom: '0',

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

export const Container = styled.div`
inline-size: 150px;
text-align: center;
 width: 250px;
  padding: 3px;
  margin: 3px;

`;

export const box = styled.div`
  height: 1%;

`;
const QandA = (props) => {
  const url = props.match.params.id;
  const [QandAResponses , setQandAResponses] =useState({responses:[]});
  const [resUrl, setResUrl] = useState("");
  const [question,setquestion]=useState({question:""})
  axios.get(`http://localhost:8080/QandA/${url}`)
   .then(res=>{
        setquestion({question:res.data.question})
       })
    .catch((error)=>{
      console.log(error)
    })
  
      useEffect(async ()=>{
        await axios.get(`http://localhost:8080/quest/${url}`)
            .then(result => {
              setResUrl(result.data);
            // console.log(resUrl);
            })
            .catch(error => console.log(error))
    
          },[])
    
          if(resUrl !== ""){
            axios.get(`http://localhost:8080/responses/${resUrl}`)
            .then ((res) => {
              setQandAResponses({responses: res.data.responses})
              // console.log(res.data.responses)
            })
            .catch(error => console.log(error))
          }
          const choice=QandAResponses.responses;
         const classes = useStyles();
    
    return ( <div>
    <div> <h1 style={{fontFamily:"Helvetica",  textAlign:"center",paddingTop:"5%"}} > {question.question}</h1></div>
        <div style={{justifyContent: 'space-evenly',display: 'flex', flexWrap: 'wrap', width: '100%'}} >
           {choice.map((x, i) => {
         const color = randomColor({count:1,luminosity: 'bright'});
    return(
       
       <Container>
         

         <Box color="white" bgcolor={color} p={2} fontFamily= "Helvetica" style={{ backgroundColor:{color}, width: '100%'}} >
              {x}
                </Box>
               </Container>
       
    )
    })}
    </div>
    </div>
    );
}

export default QandA
