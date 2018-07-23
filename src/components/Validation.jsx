import React, { Component } from 'react';

export class Validation extends Component {
  componentWillMount() {
    const { previousStep } = this.props;
    const { metadata } = previousStep;
    
    // We test here simply for input == "fail" to fail the question. You would call some validation here.
    const trigger = previousStep.value === 'fail' ? 'help-message' : metadata.triggerNext;

    this.props.triggerNextStep({value: metadata.triggerNext, trigger });
  }

  render() {
    return null;
  }
}

export class HelpMessage extends Component {
  componentDidMount() {
    const { previousStep } = this.props;
    // In case of an update case, this would fail otherwise (not knowing the real prev state)
    // Reproducable when failing again after a failing update step.
    const realPreviousStepId = previousStep.metadata.id || previousStep.id;
    this.props.triggerNextStep({ trigger: realPreviousStepId });
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