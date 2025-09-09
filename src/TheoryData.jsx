const theoryData = {
  text: {
    heading: "HTML Questions",
    data: [
      {
        id: 1,
        query: "What is HTML?",
        answer: "HTML defines the structure of web pages.",
      },
      {
        id: 2,
        query: "What is DOCTYPE?",
        answer: "It declares the HTML version.",
      },
      { 
        id: 3,
        query: "what is meta-tag?",
        answer:
          "meta-tag defines metadata about an HTML document inshort it provide info about wp to se and user.",
      },
      {
        id: 4,
        query: "What is semantic and non-semantic element?",
        answer:
          "semantic--refers to the element that provide meaning to the html page. non-semantic--refers to the element that does not have any meaning but only used for style and format on wp",
      },
    ],
  },
  style: {
    heading: "CSS Questions",
    data: [
      { id: 1, query: "What is CSS?", answer: "CSS styles the HTML content." },
      {
        id: 2,
        query: "display properties?",
        answer:
          "The d prop is used to specify how an element is shown on a web page.",
      },
      {
        id: 3,
        query: "what is media query?",
        answer:
          "The view of a wp differs from system to system and based on device, so mq allows the styling of elements depending on the device it helps to create responsive web design.",
      },
      {
        id: 4,
        query: "type of css? which has top priority",
        answer: "inline, internal and external, inline has top priority.",
      },
      {
        id: 5,
        query: "why we use !important in css?",
        answer:
          "when we give important to an element then it will overide every other css rule applied on it .",
      },
      {
        id: 6,
        query: "What is position property and name them?",
        answer:
          "Position properties in css helps us to sets how an element is positioned in a document . There are five of them static, fixed, sticky, absolute and relative ",
      },
      {
        id: 7,
        query: "What is display property",
        answer:
          "The display property is used to specify how an element is shown on a web page.",
      },
      {
        id: 8,
        query: "What is CSS box model?",
        answer:
          "The box model treats every HTML element as a rectangular box consisting of content, padding, border, and margin.",
      },
      {
        id: 9,
        query: "What is difference between visibility hidden and display none?",
        answer: "Both hide the element on which we are using but .",
      },
      {
        id: 10,
        query: "What is pseudo-classess?",
        answer:
          "A pseudo-class is used to define a special state of an element.",
      },
      {
        id: 11,
        query: "What is pseudo-element?",
        answer: "pseudo-element is used to style specific parts of an element.",
      },
      {
        id: 12,
        query: "What is CSS Box Modal?",
        answer:
          " CSS Box Modal is a box modal that wraps around every HTML element. It consists of: content, padding, borders and margins.",
      },
    ],
  },
  script: {
    heading: "JavaScript Questions",
    data: [
      { id: 1, query: "What is JS?", answer: "JS makes the page interactive." },
      {
        id: 2,
        query: "What is var/let/const?",
        answer:
          "let and const are block scope while var is global scope.var variables can be updated and re-declared within its scope; let variables can be updated but not re-declared; const variables can neither be updated nor re-declared",
      },
      {
        id: 3,
        query: "what are array methods?",
        answer:
          "Array methods are functions built-in to JavaScript that we can apply to our arrays.",
      },
      {
        id: 4,
        query: "What are closures?",
        answer:
          "closure is a function's ability to remember and access variables from its surrounding (lexical) scope even after that scope has finished executing.",
      },
      { id: 5, query: "What is JS?", answer: "JS makes the page interactive." },
      { id: 6, query: "What is JS?", answer: "JS makes the page interactive." },
      { id: 7, query: "What is JS?", answer: "JS makes the page interactive." },
      { id: 8, query: "What is JS?", answer: "JS makes the page interactive." },
      { id: 9, query: "What is JS?", answer: "JS makes the page interactive." },
      {
        id: 10,
        query: "What is JS?",
        answer: "JS makes the page interactive.",
      },
    ],
  },
  react: {
    heading: "React Questions",
    data: [
      {
        id: 1,
        query: "What is React?",
        answer:
          "React is an open-source JavaScript library for building user interfaces based on components.",
      },
      {
        id: 2,
        query: "What is state?",
        answer:
          "State of a component is an object that holds some information that may change over the lifetime of the component.",
      },
      {
        id: 3,
        query: "What is props?",
        answer:
          "props is a special keyword for properties & it is used to pass data from one parent component to the other.",
      },
      {
        id: 4,
        query: "Difference between state and props?",
        answer: "State is mutable but props are immutable.",
      },
      {
        id: 5,
        query: "How do you optimized your React app performance.?",
        answer:
          "To optimize react app I used React.memo, useCallback, useMemo and to avoid prop drilling i used Redux and Context API ",
      },
      {
        id: 6,
        query: "How do you ensure accessibility in your UI components?",
        answer:
          "Use semantic HTML, add ARIA attributes, use labels for form inputs, use alt text for imgs",
      },
      {
        id: 7,
        query: "Why we use <link/> instead of <a/>?",
        answer:
          "To enable smooth, fast navigation without reloading the full page. <a /> reloads the whole page, while <Link /> keeps it a single-page app (SPA).",
      },
      {
        id: 8,
        query:
          "What is key prop and what is the benefit of using it in arrays of elements?",
        answer:
          "Key prop helps React identify which items have changed, are added, or are removed.",
      },
      {
        id: 9,
        query: "What is Virtual DOM?",
        answer:
          "The Virtual DOM (VDOM) in React is a lightweight representation of the actual Document Object Model (DOM), it creates a Virtual DOM tree that mirrors the structure of the UI and render only that part in which changes is made",
      },
      {
        id: 10,
        query: "Is it possible to use react without JSX?",
        answer:
          "Yes, we can as JSX is not mandatory for react but on the same hand jsx is widely use and highhly recommended for visual clarity and solving errors",
      },
      {
        id: 11,
        query: "What are inline conditional expressions?",
        answer:
          "The ternary operator ( ? : ) is a short if-else statement which takes 3 operands. ",
      },
      {
        id: 11,
        query: "What are inline conditional expressions?",
        answer:
          "The ternary operator ( ? : ) is a short if-else statement which takes 3 operands. ",
      },
      {
        id: 12,
        query: "?",
        answer:
          "The ternary operator ( ? : ) is a short if-else statement which takes 3 operands. ",
      },
      {
        id: 11,
        query: "What are inline conditional expressions?",
        answer:
          "The ternary operator ( ? : ) is a short if-else statement which takes 3 operands. ",
      },
    ],
  },
};

export default theoryData;
