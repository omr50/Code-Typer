import './App.css';
import Navigationbar from './components/navbar/navbar.component';
import Intro from './components/introduction/intro.component';
import TextGame from './components/text-game/text-game.component';
import { Route, Routes } from 'react-router-dom';
import TextEndscreen from './components/text-game/text-game-endscreen.component';
import CppGame from './components/cpp-game/cpp-game.component';
import PythonGame from './components/python-game/python-game.component';
import JavaGame from './components/Java-game/java-game.component';
function App() {
  return (
    <div className="App">
      {/* <TextGame/> */}
      <Routes>
        <Route path='' element={<Navigationbar/>}>
          <Route path='/' element={<Intro/>}/>
          <Route path='/text-type' element={<TextGame/>}/>
          <Route path='/Cpp-game' element={<CppGame/>}/>
          <Route path='/Python-game' element={<PythonGame/>}/>
          <Route path='/Java-game' element={<JavaGame/>}/>
          <Route path="/text-type/:timer/:outputlength/:totalMistakes" element={<TextEndscreen linkTo='/text-type' />}/>
          <Route path="/Cpp-game/:timer/:outputlength/:totalMistakes" element={<TextEndscreen linkTo='/Cpp-game' />}/>
          <Route path="/Python-game/:timer/:outputlength/:totalMistakes" element={<TextEndscreen linkTo='/Python-game' />}/>
          <Route path="/Java-game/:timer/:outputlength/:totalMistakes" element={<TextEndscreen linkTo='/Java-game' />}/>

        
        </Route>
      </Routes>
    {/* <HomeCards/> */}
    </div>
  );
}

export default App;
