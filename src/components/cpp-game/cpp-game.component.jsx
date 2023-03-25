import '../text-game/text-game.styles.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = 'https://api.api-ninjas.com/v1/quotes/?category=';

const API_KEY = process.env.REACT_APP_API_KEY;

const keys = {
    'Shift': '',
    'Tab' : '',
    'Backspace': '',
    'CapsLock': '',
    'Enter' : '',
    ' ' : ''
}

const categories = [
    "age",
    "architecture",
    "best",
    "birthday",
    "business",
    "car",
    "communications",
    "computers",
    "cool",
    "courage",
    "dad",
    "design",
    "dreams",
    "education",
    "environmental",
    "failure",
    "family",
    "famous",
    "fitness",
    "food",
    "funny",
    "future",
    "graduation",
    "great",
    "happiness",
    "health",
    "history",
    "home",
    "humor",
    "imagination",
    "inspirational",
    "intelligence",
    "knowledge",
    "leadership",
    "learning",
    "medical",
    "money",
    "morning",
    "movies",
    "success"]
const config = {
  headers: {
    'x-api-key': API_KEY
  }
};

function CppGame() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState('')
  const [word, setWord] = useState('')
  const [output, setOutput] = useState('')
  const [typed, setTyped] = useState('')
  const [timer, setTimer] = useState(0)
  const [selectedMode, setSelectedMode] = useState('')
  const [stylesQ, setStylesQ] = useState({})
  const [stylesW, setStylesW] = useState({})
  const [userInput, setUserInput] = useState('')
  const styles1 = {backgroundColor:'gray'}
  const [timerStarted, setTimerStarted] = useState(false)
  const [mistakes, setMistakes] = useState('')
  const [cppCode, setCppCode] = useState('');
  const [indexBy, setIndexBy] = useState(0);
  const newLineIf = new Set(['{', '}', ';', '>'])
    const generateCode = () => {
      // Declare some random variables
      const wordsArray = word.split(" ");
      const numVars = Math.floor(Math.random() * 3) + 1;
      const varNames = [];
      for (let i = 0; i < numVars; i++) {
        varNames.push(`${wordsArray[i]}`);
      }
      const varDeclarations1 = (varNames.map((name) => `int ${name} = ${Math.floor(Math.random() * 100)}; `).join(''));
      const varDeclarations = varDeclarations1.substring(0, varDeclarations1.length-1)
      // Define a random function
      const funcName = Math.random() < 0.5 ? '' : wordsArray[Math.floor(Math.random() * 3) + 1];
      const funcDefinition = funcName
        ? `int ${funcName}(int x, int y) { return x * y / ${Math.floor(Math.random() * 10)}; }`
        : '';
  
      // Generate some random code statements
      const numStatements = Math.floor(Math.random() * 3) + 2;
      const statements = [];
      for (let i = 0; i < numStatements; i++) {
        statements.push(`cout << "${wordsArray[Math.floor(Math.random() * 38) + 1]}: " << ${wordsArray[Math.floor(Math.random() * 38) + 1]} << endl; `);
      }
      const codeStatements = statements.join('');
  
      // Combine the code elements into a complete C++ program
      const codeTemplate = `#include <iostream> using namespace std; ${varDeclarations} ${funcDefinition} int main() { ${codeStatements} return 0; }`;

      setCppCode(codeTemplate);
    };
  
  useEffect(()=> {
    fetchWords();
    generateCode();
  }, [])

  useEffect(()=> {
    generateCode();
  }, [word])


  
// implement:
// 1. the cursor that will be at the front of the user generated text.
// 2. the ability for users to enter text.
// 3. Checking if the strings match.
// 4. Can make a for each or for loop which will render
// the elements in different colors on the page depending
// on if it is a correctly typed char, incorrect, or not
// yet typed.
 
  const fetchWords = async () => {
    try {
      // another option: https://random-word-api.herokuapp.com/word?number=50&length=5
      const response = await fetch('https://random-word-api.vercel.app/api?words=40&length=5');
      const words = await response.json();
      // Filter out vulgar words and words with more than 6 characters
      const filteredWords = words.join(' ');
        
      // Set the filtered words in state
      setWord(filteredWords);
    } catch (error) {
      console.error(error);
    }
  };


useEffect(() => {
  let intervalId;
  if (timerStarted) {
    intervalId = () => setTimer((timer) => timer + 1);
    intervalId = setInterval(intervalId, 1000);
  }

  return () => clearInterval(intervalId);
}, [timerStarted]);
 // use effect to stop infinite re render.
  // render will only happen when the item
  // in dependency array (selectedMode) changes
  useEffect(()=>{
    if (selectedMode === 'quote'){
        setStylesQ(styles1);
        setStylesW({});
        setOutput(quote)
      }
      else if (selectedMode === 'word'){
        setStylesW(styles1);
        setStylesQ({});
        setOutput(word)
      }
  }, [selectedMode, quote, word])

  useEffect(()=>{  if (userInput.length > 0 && newLineIf.has(cppCode[userInput.length-2])){
    setIndexBy(userInput.length)
    }
    },[userInput])

  useEffect(() => {
    const handleKeyDown = (event) => {
        if (timer === 0){
            setTimerStarted(true)
        }
      if (!(event.key in keys) && event.key.length === 1){
        if (!(newLineIf.has(cppCode[userInput.length-1]))){
            const newInput = userInput + event.key;
            setUserInput(newInput);
        }
      }
      else {
        if (event.key == 'Backspace'){
          if (indexBy < userInput.length)
            setUserInput(userInput.substring(0, userInput.length-1))
        }
        else if (event.key == 'Enter' && newLineIf.has(cppCode[userInput.length-1])){
            let i = userInput.length;
            let totalStr = '';
            while (cppCode[i] && !(cppCode[i].match(/[a-z]/i) || newLineIf.has(cppCode[i]))){
                totalStr+= cppCode[i];
                i++;
            }
            setUserInput(userInput + totalStr);
        }
        else if (event.key === ' '){
          event.preventDefault();
          setUserInput(userInput + ' ')
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [userInput, indexBy]); 

  const length = Math.max(output.length, cppCode.length);
  if (userInput.length != cppCode.length || timer === 0)
  return (
    <div>
        <div style={{display:'flex', justifyContent: 'center' }}>
        <div className='button-container'>
            <div className='options-item'>Options</div>
            <div className='timer-item'>Timer: {timer}s</div>
            <div className='reset-item' onClick={()=>{
                
                }}>Reset</div>
        </div>
        </div>
        <div className='box-container'>
          {/* <div style={{position:'relative'}}><div style={{backgroundColor:'#1a1c2c', height: '150px', width:'100%', position:'absolute', top:'0px', zIndex:'1'}}></div></div> */}
            <div className='quote-container'>
                {/* figure out how to add cursor as well in this case. */}
                {Array.from({ length }).map((_, index) => {
                const newIndex = index + indexBy;
                if (newIndex < cppCode.length){
                const char1 = cppCode.charAt(newIndex);
                const char2 = userInput.charAt(newIndex);
                const color = char1 === char2 ? '#00ff00 ' : (char2 ? '#ff6347' : 'white');
                const className = ((!char2 && userInput.charAt(newIndex-1)) || (newIndex===0 && !char2)) ? 'text-cursor' : '';
                const enter = (newLineIf.has(cppCode.charAt(newIndex)) && (!char2 && userInput.charAt(newIndex-1)) || (newIndex===0 && !char2)) ? ' ' : '';
                
                return (
                    <span>
                      {(cppCode[newIndex+3] && (cppCode.substring(newIndex, newIndex+4) == 'cout' || cppCode.substring(newIndex, newIndex+3) == 'ret')) ? <span>&emsp;&emsp;</span> : ''}
                {!(newLineIf.has(char1)) ?
                <span key={index} style={{ color, position: 'relative ' }} className={className}>
                    {newLineIf.has(cppCode.charAt(newIndex-1)) && (!char2 && userInput.charAt(newIndex-1)) ? <span style={{position:'relative'}}><span style={{position:'absolute', left:'-50px'}}>{String.fromCharCode(0x2192)}</span></span> : ''}{char1}
                </span>
                :
                <span key={index} style={{ color, position: 'relative ' }} className={className}>
                  {/* if the character and the next 3 is cout or ret then put the tab character */}
                    {char1}{enter} <br></br>
                </span>}
                </span>
                );
      }})} 
            </div>
        </div>
    </div>
  );

  else if (cppCode.length <= userInput.length && timer != 0)
  {
    // count mistakes first then navigate to the page.
    let totalMistakes = 0;  
    for (let i = 0; i < userInput.length; i++){
        if (userInput[i] != cppCode[i])
            totalMistakes++;
    }
    navigate(`/Cpp-game/${timer}/${cppCode.length}/${totalMistakes}`)
  }
}

export default CppGame;