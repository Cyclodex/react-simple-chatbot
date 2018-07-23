import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

import { Validation, HelpMessage } from './Validation';

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
    id: 'vornameFrage',
    message: 'test',
    trigger: 'vorname',
  },
  {
    id: 'vorname',
    user: true,
    trigger: 'validate',
    metadata: {
      triggerNext: 'mobilenummerFrage',
    },
  },
  {
    id: 'validate',
    replace: true,
    component: <Validation />,
    delay: 8,
    waitAction: true,
    metadata: {
      message: '',
    },
  },
  {
    id: 'mobilenummerFrage',
    message: 'Hello question 2 with update',
    trigger: 'mobilenummerUpdate',
  },
  {
    id: 'mobilenummerUpdate',
    update: 'mobilenummer',
    trigger: 'validate',
    metadata: {
      someMetadata: 'Am I getting copied over?',
      message: 'gugus',
      triggerNext: 'end',
    },
  },
  {
    id: 'mobilenummer',
    user: true,
    trigger: 'validate',
    metadata: {
      someMetadata: 'Am I getting copied over?',
      message: 'ugugugus',
      triggerNext: 'end',
    },
  },
  {
    id: 'help-message',
    component: <HelpMessage />,
    asMessage: true,
    waitAction: true,
  },
  {
    id: 'end',
    message: 'Finish',
    end: true,
  },
];


const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <ChatBot steps={steps} />
  </ThemeProvider>
);

export default ThemedExample;
