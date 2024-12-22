import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function KitchenSinkExample({imglink ,weblink,title,content}) {
  return (
    <Card style={{ width: '18rem' }} className='m-5'>
      <Card.Img variant="top" src={imglink} />
      <Card.Body>
        <Card.Title className='text-green-600'>{title}</Card.Title>
        <Card.Text>
          {content}
        </Card.Text>
      </Card.Body>
    
      <Card.Body className='bg-gray-300 text-black' >
        <Card.Link href={weblink}>Click ME</Card.Link>
        
      </Card.Body>
    </Card>
  );
}

export default KitchenSinkExample;