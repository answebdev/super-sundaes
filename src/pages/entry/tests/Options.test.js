import { render, screen } from '@testing-library/react';
import Options from '../Options';

// Test using Mock Service Worker

// Notice that there is no mention at all of Mock Service Worker here in these tests.
// The test itself only deals with Mock Service Worker in the setup file where we configure the Service Worker to intercept network requests.
// The place that we're going to make the network request is within the Options component ('Options.js').
// So, this test is going to run the Options component,
// and then the Options component is going to make a Get request to the server.
// BUT, because we have Mock Service Workers set up, that request is never going to happen.
// Instead, Mock Service Worker is going to intercept the request,
// and then send back the handler response to the Options component in the test.

// ----------------------

// Test to check if it displays an image for each of the options that are returned from the server (not from an actual server,
// but from Mock Service Worker).
test('displays image for each scoop option from server', async () => {
  // Remember that <Options /> has a prop of 'optionType' (see Options.js).
  // And in this case, we want the type to be 'scoops'.
  render(<Options optionType='scoops' />);

  // Find the images.
  // Remember that 'getByRole' is the most preferred.
  // And we're going to get multiple images, so we're going to use 'getAllByRole'.
  // The role is 'img', and the 'name' option for images is the alt text.
  // And we're going to assume here that the alt text for every image is going to end with the string 'scoop' -> /scoop$/i
  // The dollar sign indicates that 'scoop' is at the end of the string; and we'll make it case insensitive -> 'i'

  // Remember that anytime we are doing anything asynchronous (and server connections are almost always asynchronous),
  // we need to use 'await' and 'findBy'.
  // So, let's replace our 'getBy' with 'await' and 'findBy'.
  // And we also need to make the function 'async' (up above), since we're using 'await'.

  // const scoopImages = screen.getAllByRole('img', { name: /scoop$/i });

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });

  // Note that in 'handler.js', it's returning 2 scoop options (Chocolate and Vanilla).
  // So, we'll expect it to have a length of 2.
  expect(scoopImages).toHaveLength(2);

  // Confirm alt text of images.
  // Let's be a little more specific about the images we find.
  // So, let's assert on the alt text of the images as well.
  // Get the alt text of all of the images using 'map' to map our array of elements to an array of 'altText'.
  // So, for every 'element', we can get its alt text.
  // So, this is going to be an array of 'altText':
  const altText = scoopImages.map((element) => element.alt);

  // Assert what the array is going to equal.
  // When we're wroking with arrays or objects, we need to use any MUTABLE type.
  // Numbers and strings can use the 'toBe' matcher, whereas arrays and objects use the 'toEqual' matcher.
  // So, we'll expect that to equal the array 'Chocolate scoop', and then 'Vanilla scoop' (from 'handlers.js').
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Displays image for each toppings option from server', async () => {
  // Mock Service Worker will return three toppings from server.
  render(<Options optionType='toppings' />);
  // Find images, expect 3 based on what msw returns.
  const images = await screen.findAllByRole('img', { name: /topping$/i });
  expect(images).toHaveLength(3);

  // Check the actual alt text for the images.
  // @ts-ignore
  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});
