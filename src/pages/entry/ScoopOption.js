import Col from 'react-bootstrap/Col';

export default function ScoopOption({ name, imagePath }) {
  return (
    // If it's extra small, we want it to take the entire row (12).
    // If it's small, we want it to take up half the row (6).
    // If it's medium, we want it to take up a third of the row (4).
    // If it's large, we want it to take up a quarter of the row (3).
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
    </Col>
  );
}
