
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { LinkContainer } from "react-router-bootstrap";
const TextEndscreenContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin-top: 80px;
`;

const MetricContainer = styled.div`
  margin: 10px;
  font-size: 24px;
`;

const MetricLabel = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  
`;

const MetricValue = styled.div`
  background-color: #FEF250;
  font-size: 32px;
  border-radius: 20px;
  color: black;
`;

const TextEndscreen = ({linkTo}) => {
  const { outputlength, timer, totalMistakes } = useParams();

  return (
    <TextEndscreenContainer>
      <MetricContainer>
        <MetricLabel>Your WPM:</MetricLabel>
        <MetricValue>
          {Math.round((outputlength - totalMistakes) / 5 / timer * 60)}
        </MetricValue>
      </MetricContainer>
      <MetricContainer>
        <MetricLabel>Mistakes:</MetricLabel>
        <MetricValue>{totalMistakes}</MetricValue>
      </MetricContainer>
      <MetricContainer>
        <MetricLabel>Time:</MetricLabel>
        <MetricValue>{timer}</MetricValue>
      </MetricContainer>
      <LinkContainer to={linkTo} style={{margin:'10px'}}>
            <button className="text-button">Try Again</button>
        </LinkContainer>
        <LinkContainer to='/' style={{margin:'10px'}}>
            <button className="text-button2">Home</button>
        </LinkContainer>
    </TextEndscreenContainer>
  );
};

export default TextEndscreen;