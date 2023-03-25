
import { useState } from 'react';
import './intro.styles.css';
import HomeCards from '../home-cards/home-cards.component';
import { LinkContainer } from 'react-router-bootstrap';

const Intro = () => {
    const [grayText, setGrayText] = useState('Improve your coding skills by typing real code');
    const [darkText, setDarkText] = useState("");

    // create a function which will take in both grayText, and darkText, then it will
    // take the current letter from the start of grayText, pop it, then append it to dark
    // text.
    const typeText = (darkText, grayText) =>{
        if (grayText.length === 0){
                setGrayText(darkText)
                setDarkText("")
        }
        else{
            setDarkText(darkText+ grayText[0])
            setGrayText(grayText.substring(1))
            
        }
        
    }
    setTimeout(() => {typeText(darkText, grayText)}, 200)
  return (
    <div className="intro-container">
      <div className="intro-title" style={{color:'white'}}>Code Typer</div>
      <div className="intro-subtitle-container">
        <div className="intro-subtitle"><span style={{color:'#0a75ad'}}>{darkText}<div className='intro-cursor'></div></span><span style={{'color':'#daa520'}}>{grayText}</span></div>
      </div>
      <div className="intro-languages">
        <HomeCards/>
        {/* <span className="intro-language">JavaScript</span>
        <span className="intro-language">Python</span>
        <span className="intro-language">C++</span>
        <span className="intro-language">Java</span> */}
      </div>

      <div className="intro-subcontainer">
        <div className="intro-submessage">To get started select one of the languages above or simply practice typing regular text by clicking the button below.</div>
        <LinkContainer to='/text-type'>
            <button className="intro-button">Type Text</button>
        </LinkContainer>
      </div>
    </div>
  );
};

export default Intro;
