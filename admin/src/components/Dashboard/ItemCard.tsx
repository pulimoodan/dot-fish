import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  value: number;
}

function ItemCard({ title, value }: Props) {
  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>{value} Items</Card.Title>
        <Link to={`/admin/${title.toLowerCase()}`}>
          <Button variant="primary">Go to {title.toLowerCase()}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
