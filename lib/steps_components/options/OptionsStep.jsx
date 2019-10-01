import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import OptionElement from './OptionElement';
import Options from './Options';
import OptionsStepContainer from './OptionsStepContainer';

class OptionsStep extends Component {
  onOptionClick = ({ value }) => {
    const { triggerNextStep } = this.props;

    triggerNextStep({ value });
  };
  componentWillMount() {
    const { step, renderedSteps } = this.props;

    if (typeof step.options === 'function') {
      const newOptions = step.options(step, renderedSteps);
      this.setState({ options: newOptions });
    } else {
      this.setState({ options: this.props.step.options });
    }
  }


  renderOption = option => {
    const { bubbleOptionStyle, step } = this.props;
    const { user } = step;
    const { value, label } = option;

    return (
      <Option key={value} className="rsc-os-option">
        <OptionElement
          className="rsc-os-option-element"
          style={bubbleOptionStyle}
          user={user}
          onClick={() => this.onOptionClick({ value })}
        >
          {label}
        </OptionElement>
      </Option>
    );
  };

  render() {
    const { step } = this.props;
    const { options } = this.state;

    return (
      <OptionsStepContainer className="rsc-os">
        <Options className="rsc-os-options">
          {Object.keys(options).map(key => options[key]).map(this.renderOption)}
        </Options>
      </OptionsStepContainer>
    );
  }
}

OptionsStep.propTypes = {
  bubbleOptionStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  renderedSteps: PropTypes.array,
  step: PropTypes.objectOf(PropTypes.any).isRequired,
  triggerNextStep: PropTypes.func.isRequired
};

OptionsStep.defaultProps = {
  renderedSteps: [],
};

export default OptionsStep;
