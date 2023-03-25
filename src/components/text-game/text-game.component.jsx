import './text-game.styles.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import TextEndscreen from './text-game-endscreen.component';
import { useNavigate } from 'react-router-dom';
const API_URL = 'https://api.api-ninjas.com/v1/quotes/?category=';

const API_KEY = process.env.REACT_APP_API_KEY;

const keys = {
    'Shift': '',
    'Tab' : '',
    'Backspace': '',
    'CapsLock': ''
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

function TextGame() {
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQuote();
  }, []);

  
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
        console.log(words)
      // Filter out vulgar words and words with more than 6 characters
      const filteredWords = words.join(' ');
      console.log("filtered" + filteredWords)
        
      // Set the filtered words in state
      setWord(filteredWords);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchQuote = () => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    console.log(category)
    axios.get(API_URL+category, config)
      .then(response => {
        setQuote(response.data[0].quote)
        setLoading(false)
        if (selectedMode === '')
            setSelectedMode('quote')
    })
      .catch(error => 
        {
          setLoading(true)
          fetchQuote();
        }
        );
  }
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

  useEffect(() => {
    const handleKeyDown = (event) => {
        if (timer === 0){
            console.log('worked')
            setTimerStarted(true)
        }
      if (!(event.key in keys)){
        const newInput = userInput + event.key;
        setUserInput(newInput);
      }
      else {
        if (event.key == 'Backspace'){
            setUserInput(userInput.substring(0, userInput.length-1))
        }
      }
      console.log(event.key + "totals: " + userInput);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [userInput]);



  const length = Math.max(output.length, userInput.length);
  if (userInput.length != output.length || timer === 0)
  return (
    <div>
        <div style={{display:'flex', justifyContent: 'center' }}>
        <div className='button-container'>
            <div className='options-item'>Options</div>

            <div className="button-item" onClick={()=>{setSelectedMode('quote'); fetchQuote(); setUserInput(''); setTimerStarted(false); setTimer(0)}} style={stylesQ}>Quote</div>
            <div className='button-item' onClick={()=>{setSelectedMode('word'); fetchWords(); setUserInput(''); setTimerStarted(false); setTimer(0)}} style={stylesW}>Words</div>
            <div className='timer-item'>Timer: {timer}s</div>
            <div className='reset-item' onClick={()=>{
                if (selectedMode === 'quote'){
                  fetchQuote()
                  setLoading(true)
                }
                else
                    fetchWords()
                setTimer(0)
                setUserInput('')
                setTimerStarted(false);
                console.log("WPM: ",userInput.length, output.length)

                }}>Reset</div>
        </div>
        </div>
        <div className='box-container'>
            <div className='quote-container'>
                {/* figure out how to add cursor as well in this case. */}
                {loading === true ? <div className='loading-bar' style={{color:'white'}}>Loading</div> :
                Array.from({ length }).map((_, index) => {
                const char1 = output.charAt(index);
                const char2 = userInput.charAt(index);
                const color = char1 === char2 ? '#00ff00 ' : (char2 ? '#ff6347' : 'white');
                const className = ((!char2 && userInput.charAt(index-1)) || (index===0 && !char2)) ? 'text-cursor' : '';
                return (
                    <span>
                <span key={index} style={{ color, position: 'relative ' }} className={className}>
                    {char1}
                </span>
                </span>
                );
      })} 

            </div>
        </div>
    </div>
  );

  else if (output.length === userInput.length && timer != 0)
  {
    // count mistakes first then navigate to the page.
    let totalMistakes = 0;  
    for (let i = 0; i < userInput.length; i++){
        if (userInput[i] != output[i])
            totalMistakes++;
    }
    navigate(`/text-type/${timer}/${output.length}/${totalMistakes}`)
  }
}

export default TextGame;