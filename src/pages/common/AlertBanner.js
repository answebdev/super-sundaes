import Alert from 'react-bootstrap/Alert';

export default function AlertBanner({ message, variant }) {
  // Default message.
  const alertMessage =
    // If this message prop is truthy, then just set it to that.
    // Otherwise ('||'), if falsey, set it to to the message ('An unexpected error...'):
    message || 'An unexpected error occurred. Please try again later.';

  // Default variant.
  // If variant is truthy, set it to that. Ohterwise, use the 'danger' variant.
  const alertVariant = variant || 'danger';

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
      {alertMessage}
    </Alert>
  );
}
