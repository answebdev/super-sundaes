import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test('Initial conditions', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  expect(confirmButton).toBeDisabled();
});

test('Checkbox enables button on first click and disables on second click', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole('button', {
    name: /confirm order/i,
  });

  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

// Commands
// get: expect element to be in DOM
// query: expect element NOT to be in DOM
// find: expect element to appear ASYNCHRONOUSLY

// https://testing-library.com/docs/queries/about/
// https://testing-library.com/docs/queries/about/#priority
// https://testing-library.com/docs/react-testing-library/cheatsheet/

test('popover responds to hover', async () => {
  render(<SummaryForm />);
  // Check that popover starts out hidden when page loads.
  // It's not HIDDEN by display - it's actually NOT on the page.
  // To test that something is NOT showing, we can use 'queryBy'.
  // In this case, 'queryByText'. This popover is NOT going to have a role that we can query by.
  // 'i' means case insensitive:
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // Check that popover appears upon mouseover of checkbox label.
  // Here, we need to simulate a mouseover - use 'hover' (and 'unhover' to mouse out) from user-event.
  // We want to mouseover the 'terms and conditions' text in order to make the popover appear.
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  // Use 'hover' to simulate a mouseover.
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // Check that popover disappears when we mouse out.
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
