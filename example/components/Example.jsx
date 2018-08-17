import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

function showExistingOptions(step, steps) {
  const options = [];

  // Chatbot custom logic:
  const defaultOptions = [
    { value: 'Firstname', label: "Firstname", trigger: 'updateTest' },
    { value: 'Lastname', label: "Lastname", trigger: 'updateTest' },
    // TODO: Add Ausbildungsdatum
    { value: 'geburtstag', label: "geburtstag", trigger: 'updateTest' },
    { value: 'anythingelse', label: "anythingelse", trigger: 'updateTest' },
    { value: 'Phone', label: "Phone", trigger: 'updateTest' },
    { value: 'Email', label: "Email", trigger: 'EmailUpdate' },
  ];

  defaultOptions.forEach((option) => {
    // Only show already used steps, remove others
    if (steps[option.value]) {
      options.push(option);
    }
  });

  return options;
}

const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#6E48AA',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const steps = [
  {
    id: 'start',
    message: 'Please enter some information about you:',
    trigger: 'Firstname',
  },
  {
    id: 'Firstname',
    placeholder: 'Firstname',
    user: true,
    // inputAttributes: {
    //   name: 'firstname',
    //   autoComplete: 'given-name',
    // },
    trigger: 'Lastname',
  },
  {
    id: 'Lastname',
    placeholder: 'Lastname',
    user: true,
    inputAttributes: {
      name: 'lastname',
      autoComplete: 'family-name',
    },
    trigger: 'Email',
  },
  {
    id: 'Email',
    placeholder: 'Email',
    user: true,
    inputAttributes: {
      type: 'email',
      name: 'email',
      autoComplete: 'home email',
    },
    trigger: 'Options',
  },
  {
    id: 'checking',
    message: 'OK, all done. Some other infos to add?',
    trigger: 'Options',
  },
  {
    id: 'Options',
    placeholder: 'Options text',
    options: showExistingOptions,
    // options: [
    //   { value: 'Firstname', label: "Firstname", trigger: 'updateTest' },
    //   { value: 'Lastname', label: "Lastname", trigger: 'updateTest' },
    //   // TODO: Add Ausbildungsdatum
    //   { value: 'geburtstag', label: "geburtstag", trigger: 'updateTest' },
    //   { value: 'anythingelse', label: "anythingelse", trigger: 'updateTest' },
    //   { value: 'Phone', label: "Phone", trigger: 'updateTest' },
    //   { value: 'Email', label: "Email", trigger: 'EmailUpdate' },
    // ],
  },
  {
    id: 'updateTest',
    message: 'Next, should be again an e-mail field:',
    trigger: 'EmailUpdate',
  },
  {
    id: 'EmailUpdate',
    update: 'Email',
    trigger: 'End',
  },
  {
    id: 'Phone',
    placeholder: 'Phone',
    user: true,
    inputAttributes: {
      type: 'tel',
      name: 'tel',
      autoComplete: 'tel',
    },
    trigger: 'checking',
  },
  {
    id: 'End',
    message: 'Finish',
    end: true,
  },
];

// Initially it needs any working autoComplete value here,
// otherwise it might not work later when changing type later to tel.
// Best might be to take the first needed type.
const inputAttributes = {
  autoComplete: 'firstname',
};

const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <ChatBot
      steps={steps}
      cache={true}
      enableMobileAutoFocus={true}
      userDelay={0}
      inputAttributes={inputAttributes}
    />
  </ThemeProvider>
);

export default ThemedExample;
