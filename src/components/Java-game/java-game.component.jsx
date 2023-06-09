import '../text-game/text-game.styles.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = 'https://api.api-ninjas.com/v1/quotes/?category=';

const API_KEY = process.env.REACT_APP_API_KEY;
const pyLibraries = [
    'io.*',
    'text.*',
    'regex.*',
    'util.*',
    'util.ArrayList',
    'util.Scanner',
    'time',
    'util.logging'
  ]
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

function JavaGame() {
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
  const [javaCode, setjavaCode] = useState('');
  const [indexBy, setIndexBy] = useState(0);
  const newLineIf = new Set(['{', '}', ';', '>', ':'])
    const generateCode = () => {
      // Declare some random variables
      const wordsArray = word.split(" ");
      const numVars = Math.floor(Math.random() * 3) + 2;
      const varNames = [];
      for (let i = 0; i < numVars; i++) {
        varNames.push(`${wordsArray[i]}`);
      }
      const types = ['String', 'int', 'double', 'char']
      const accessModifiers = ['public', 'private', 'protected']
      const varDeclarations1 = (varNames.map((name) => `${types[Math.floor(Math.random() * 4)]} ${name} = ${Math.floor(Math.random() * 100)}; `).join(''));
      const varDeclarations = varDeclarations1.substring(0, varDeclarations1.length-1)
      const arr = varDeclarations.split(' ')
      // Define a random function
      const alphabet = "abcdefghijklmnopqrstuvwxyz"
      const funcName = wordsArray[Math.floor(Math.random() * 3) + 1];
      const var1 = wordsArray[Math.floor(Math.random() * 38) + 1];
      const var2 = wordsArray[Math.floor(Math.random() * 38) + 1];
      const funcDefinition = `void ${funcName}(${arr[0]} ${var1}, ${arr[4]} ${var2}) { this.${varNames[0]} = ${var1}; this.${varNames[1]} = ${var2}; System.out.println(${varNames[0]} + ${varNames[1]}); } }`;
        const class1 = `${accessModifiers[Math.floor(Math.random() * 3)]} class ${wordsArray[Math.floor(Math.random() * 38) + 1]} {`
      // Generate some random code statements
      
      // Combine the code elements into a complete C++ program
      const JavaLib1 = Math.floor(Math.random() * 8);
      const JavaLib2 = (JavaLib1 + 1) % 8;
      const codeTemplate = `import Java.${pyLibraries[JavaLib1]}; import Java.${pyLibraries[JavaLib2]}; ${class1} ${varDeclarations} ${funcDefinition}`;

      setjavaCode(codeTemplate);
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
      console.error('error');
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

  useEffect(()=>{  if (userInput.length > 0 && newLineIf.has(javaCode[userInput.length-2])){
    if (javaCode[userInput.length] === '-')
        setIndexBy(userInput.length+1)
    else
        setIndexBy(userInput.length)
    }
    },[userInput])

  useEffect(() => {
    // this skips the semi colons which are just
    // used to control the split to new line.
    const handleKeyDown = (event) => {
        if (timer === 0){
            setTimerStarted(true)
        }
      if (!(event.key in keys) && event.key.length === 1){
        if (event.key === "'" || event.key === '/'){
          event.preventDefault();
          setUserInput(userInput + event.key)
        }
        else if (!(newLineIf.has(javaCode[userInput.length-1]))){
            const newInput = userInput + event.key;
            setUserInput(newInput);
        }
      }
      else {
        if (event.key == 'Backspace'){
          if (indexBy < userInput.length)
            setUserInput(userInput.substring(0, userInput.length-1))
        }
        else if (event.key == 'Enter' && newLineIf.has(javaCode[userInput.length-1])){
            let i = userInput.length;
            let totalStr = '';
            while (javaCode[i] && !(javaCode[i].match(/[a-z]/i) || newLineIf.has(javaCode[i]))){
                totalStr+= javaCode[i];
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

  const length = Math.max(output.length, javaCode.length);
  if (userInput.length != javaCode.length || timer === 0)
  return (
    <div>
        <div style={{display:'flex', justifyContent: 'center' }}>
        <div className='button-container'>
            <div className='options-item'>Options</div>
            <div className='timer-item'>Timer: {timer}s</div>
            <div className='reset-item' onClick={()=>{
                    setTimer(0)
                    setUserInput('')
                    setTimerStarted(false);
                    generateCode();
                }}>Reset</div>
        </div>
        </div>
        <div className='box-container'>
          {/* <div style={{position:'relative'}}><div style={{backgroundColor:'#1a1c2c', height: '150px', width:'100%', position:'absolute', top:'0px', zIndex:'1'}}></div></div> */}
            <div className='quote-container'>
                {/* figure out how to add cursor as well in this case. */}
                {Array.from({ length }).map((_, index) => {
                const newIndex = index + indexBy;
                if (newIndex < javaCode.length){
                const char1 = javaCode.charAt(newIndex);
                const char2 = userInput.charAt(newIndex);
                const color = char1 === char2 ? '#00ff00 ' : (char2 ? '#ff6347' : 'white');
                const className = ((!char2 && userInput.charAt(newIndex-1)) || (newIndex===0 && !char2)) ? 'text-cursor' : '';
                const enter = (newLineIf.has(javaCode.charAt(newIndex)) && (!char2 && userInput.charAt(newIndex-1)) || (newIndex===0 && !char2)) ? ' ' : '';
                
                return (
                    <span>
                      {((javaCode[newIndex+7] && javaCode.substring(newIndex-1, newIndex) != '(' && javaCode.substring(newIndex-2, newIndex-1) != ',' && javaCode.substring(newIndex-2, newIndex) != 'pr') && (javaCode.substring(newIndex+6, newIndex+8) == '+=' || javaCode.substring(newIndex, newIndex+7) == 'System.' || javaCode.substring(newIndex, newIndex+4) == 'int ' || javaCode.substring(newIndex, newIndex+5) == 'char ' || javaCode.substring(newIndex, newIndex+7) == 'String ' || javaCode.substring(newIndex, newIndex+5) == 'void ' || javaCode.substring(newIndex, newIndex+7) == 'double ' || javaCode.substring(newIndex, newIndex+5) == 'this.')) ? <span>&emsp;&emsp;</span> : ''}
                      {((javaCode[newIndex+7] && javaCode.substring(newIndex-1, newIndex) != '(' && javaCode.substring(newIndex-2, newIndex-1) != ',' && javaCode.substring(newIndex-2, newIndex) != 'pr') && (javaCode.substring(newIndex, newIndex+7) == 'System.' || javaCode.substring(newIndex, newIndex+5) == 'this.')) ? <span>&emsp;&emsp;</span> : ''}
                {!(newLineIf.has(char1)) ?
                <span key={index} style={{ color, position: 'relative ' }} className={className}>
                    {newLineIf.has(javaCode.charAt(newIndex-1)) && (!char2 && userInput.charAt(newIndex-1)) ? <span style={{position:'relative'}}><span style={{position:'absolute', left:'-50px'}}>{String.fromCharCode(0x2192)}</span></span> : ''}{char1}
                    
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

  else if (javaCode.length <= userInput.length && timer != 0)
  {
    // count mistakes first then navigate to the page.
    let totalMistakes = 0;  
    for (let i = 0; i < userInput.length; i++){
        if (userInput[i] != javaCode[i])
            totalMistakes++;
    }
    navigate(`/Java-game/${timer}/${javaCode.length}/${totalMistakes}`)
  }
}

export default JavaGame;

// Java is pretty much done unless an error is discovered. TODO: make sure that
// CPP has a proper reset. Then implement JS and we should be done. ALSO make sure
// that the end screen buttons take back to the proper language. Not to python
// each time.
// EXTRA YOU CAN ADD AN "unable to get accurate wpm" if the mistakes are a lot.