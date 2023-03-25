import './generic-card.styles.css';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const ProgrammingCard = ({ image, description, link }) => {
  return (
    <LinkContainer to={link} style={{ width: '16rem', margin: '10px', position: 'relative' }}>
    <Card className='cardBounce'>
      <Card.Img variant='top' src={image} />
      <div className='overlay'>
        <Card.Title style={{ minHeight: '40px' }}>{description}</Card.Title>
      </div>
    </Card>
    </LinkContainer>
  );
};

export default ProgrammingCard;
