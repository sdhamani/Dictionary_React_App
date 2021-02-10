import './App.css';
import {useEffect , useState} from "react";
import axios from "axios";
import { Container, Switch, withStyles } from '@material-ui/core';
import Header from './components/Header/Header';
import Definations from './components/Definations/Definations';
import { grey } from '@material-ui/core/colors';


function App() {
  const [word, setWord] = useState("");

  const [meanings, setmeanings] = useState([]);

  const [category, setCategory] = useState("en")

  const[lightMode , setLightMode] = useState(false);

  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch );

  const dictApi = async() => { 
    try{
      // console.log(category)
      // console.log(word)
      let apiLink = `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      const data = await axios.get(apiLink)
      setmeanings(data.data)
      // console.log(data)
    }
    catch(error){
      console.log(error)
    }
    
  }

  // console.log(meanings);

  useEffect(() => {
    dictApi(); 
  }, [word,category])
  return (
    <div className="App"
    style={{
      height:"100vh" ,
       backgroundColor: lightMode?"#fff":"#282c34" ,
       color: lightMode?"black":"white",
       transition:"all 0.5s linear"
       }}>

      <Container max="md"
      style={{ display:"flex",  flexDirection:"Column" , height:"100vh"}}>
        <div style={{position:"absolute" , top:0 , right:15 , paddingTop:"10px"}}>
          <span>{lightMode?"Dark":"Light"} Mode</span>
          <DarkMode checked={lightMode} onChange={() => setLightMode(!lightMode)}/>
        </div>
        <Header category={category} setCategory={setCategory} lightMode={lightMode} word={word} setWord={setWord}></Header>

      {meanings && (<Definations word={word} meanings={meanings} lightMode={lightMode} category={category}/>)}
      </Container>
    </div>
  );
}

export default App;
