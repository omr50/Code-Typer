import './home-cards.styles.css'
import ProgrammingCard from '../generic-card/generic-card.component'
import { useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
const cppDescription = {
    image: 'https://i.imgur.com/mTYk9cg.png',
    description: 'C++'
  }
  const javaDescription = {
    image: 'https://i.imgur.com/UEorW8x.jpg',
    description: 'Java'
  }
  const javascriptDescription = {
    image: 'https://i.imgur.com/5ayxLHW.png',
    description: 'Javascript'
  }
  const pythonDescription = {
    image: 'https://i.imgur.com/ZlwX2UK.png',
    description: 'Python'
  }


const HomeCards = () => {
    const navigate = useNavigate()    
    return (
        <div className='home-card-container'>
            <ProgrammingCard image = {pythonDescription.image} description = {pythonDescription.description} link='/Python-game'/>
            <ProgrammingCard image = {javaDescription.image} description = {javaDescription.description} link='/Java-game'/>
            <ProgrammingCard image = {cppDescription.image} description = {cppDescription.description} link='/Cpp-game'/>
            <ProgrammingCard image = {javascriptDescription.image} description = {javascriptDescription.description} link=''/>
        </div>
    )
}

export default HomeCards;
