import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import ScoopOption from './ScoopOption';

// Sources:
// https://www.udemy.com/course/react-testing-library/learn/lecture/24450802#overview
// https://www.udemy.com/course/react-testing-library/learn/lecture/24450808#overview

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  // We're dealing with asynchronicity here.
  // When we get the data from the server, we are using Axios,
  // And we are populating the items on the page with the response in an asynchronous way.
  // *** Anytime we are doing anything asynchronous (and server connections are almost always asynchronous),
  // we need to use 'await' and 'findBy'. ***

  // useEffect takes 2 arguments: a function and a dependency array.
  // If the dependency array is empty ([]), it will run only once on component mount.
  // Otherwise, it will run whenever anything and the dependency array changes.
  useEffect(() => {
    // 'optionType' is either 'scoops' or 'toppings'.
    axios
      .get(`http://localhost:3030/${optionType}`)
      // Returns a promise with a response.
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO: handle error response.
      });
    // So now, this is going to run once on component mount,
    // and then it will run again of the 'optionType' ever changes (though it's not likely in this app - that's not how this app works ->
    // if this option is running for 'scoops', it will always run for 'scoops', and the same for 'toppings').
  }, [optionType]);

  // If we get 'scoops', then set 'ItemComponent' to be 'ScoopOption'. That's what we're going to render.
  // We're going to render a bunch of ScoopOption components from the options we get from the server (see above in 'useEffect').
  // Otherwise,
  // TODO: replace 'null' with 'ToppingOption' once it's available.
  const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

  // Make a bunch of 'ScoopOption' components based on the data we get back from the server.
  // And we'll call the array of components 'optionItems'.
  // So, the data is going to be stored in 'items' (see above in state).

  // And we're going to take 'items' and map it. So, it's going to be going from an array of data to an array of components.
  // And for each item, we're going to return this 'ItemComponent'.

  // If we look at 'handlers.js', we see that we're returning an array of objects,
  // and each object has a 'name' and an 'imagePath'.
  // So, that's what our 'ScoopOption' component is going to need in order to render the data for that particular option.

  // And whenver we have an array of components, we need to give each of them a 'key'.
  // And then we'll pass the prop of 'name' and a prop of 'imagePath'.
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}
