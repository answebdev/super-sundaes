import { render, screen, waitFor } from '@testing-library/react';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

// Test to see if alert messages show when we get an error response from the server.
// When we get an error response for 'scoops' and 'toppings' - for those routes - we get two alert messages/banners.

test('handles errors for scoops and toppings routes', async () => {
  // Set up Mock Service Worker to return errors for the scoops and toppings routes.
  // To do this, we need to override the handlers we have in 'handlers.js'.
  // To do that, we need to create new handlers - we need to import { rest } up above so we can create new handlers.
  // We also need to import the server ('server.js') so that we can override its handlers (import above).

  // RESET HANDLERS
  // Override the handlers (use the 'resetHandlers' method - this takes handlers as arguments, and it will just reset any handlers that have those endpoints for the server).
  // The first argument will be a handler that will return an error for scoops; and then we'll return an error status with our resolver.
  // So basically, our response will have a status of 500.
  // And we'll do the same for toppings.
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  // RENDER OrderEntry
  render(<OrderEntry />);
  // Find the alerts.
  // We expect these alerts to be there ASYNCHRONOUSLY, because they are not going to appear until we hit that 'catch' function on Axios.
  // It's not going to happen until AFTER the promise is rejected.
  // So, since it happens ASYNCHRONOUSLY, we use 'find' -
  // and we expect there to be 2 alerts, so we're going to 'findAllByRole'.
  // And let's find by name too to make sure they have the proper text.
  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');

    // We expect there to be 2 alerts, since we gave an error for scoops and toppings.
    expect(alerts).toHaveLength(2);
  });
});
