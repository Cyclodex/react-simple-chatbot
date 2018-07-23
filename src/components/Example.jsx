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
    message: 'Vorname',
    trigger: 'vorname',
  },
  {
    id: 'vorname',
    user: true,
    trigger: 'validate',
    metadata: {
      triggerNext: 'ausbildungNachnameFrage',
      errorMessage: 'Vorname failed, try again',
    },
  },
  {
    id: 'ausbildungNachnameFrage',
    message: 'ausbildung nachname',
    trigger: 'ausbildungNachname',
  },
  {
    id: 'ausbildungNachname',
    update: 'nachname',
    trigger: 'validate',
    metadata: {
      id: 'ausbildungNachname',
      triggerNext: 'mobilenummerFrage',
      errorMessage: 'Ausbildung Mobile nummer falsch.',
    },
  },
  {
    id: 'nachnameFrage',
    message: 'Nachname:',
    trigger: 'nachname',
  },
  {
    id: 'nachname',
    user: true,
    trigger: 'validate',
    metadata: {
      triggerNext: 'end',
    },
  },
  {
    id: 'mobilenummerFrage',
    message: 'OK: Mobile nummer Update:',
    trigger: 'mobilenummerUpdate',
  },
  {
    id: 'mobilenummerUpdate',
    update: 'mobilenummer',
    trigger: 'validate',
    metadata: {
      id: 'mobilenummerUpdate',
      someMetadata: 'Am I getting copied over?',
      errorMessage: 'GUGUS update mobile nummer error',
      triggerNext: 'special',
    },
  },
  {
    id: 'mobilenummer',
    user: true,
    trigger: 'validate',
    metadata: {
      errorMessage: 'mobilenummer original',
      triggerNext: 'vornameFrage',
    },
  },
  {
    id: 'validate',
    replace: true,
    component: <Validation />,
    delay: 8,
    waitAction: true,
    metadata: {
      errorMessage: 'Val failed',
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
  {
    id: 'special',
    message: 'Spacial case reached',
    end: true,
  },
];


const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <ChatBot steps={steps} />
  </ThemeProvider>
);

export default ThemedExample;
