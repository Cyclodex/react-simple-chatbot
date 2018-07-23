import React, { Component } from 'react';

export class Validation extends Component {
  componentWillMount() {

    console.log(this.props);
    
    const { previousStep } = this.props;
    const { metadata } = previousStep;
    const trigger = previousStep.value === 'help' ? 'help-message' : metadata.triggerNext;

    this.props.triggerNextStep({value: metadata.triggerNext, trigger });
    // previousStep.metadata = {};
    previousStep.metadata.errorMessage = 'The specific error message...';
  }

  render() {
    return null;
  }
}

export class HelpMessage extends Component {
  componentDidMount() {
    const { previousStep } = this.props;
    this.props.triggerNextStep({ trigger: previousStep.id });
  }

  render() {
    const errorMessage = this.props.previousStep.metadata.errorMessage;
    return (
      <div>
        { errorMessage }
      </div>
    );
  }
}