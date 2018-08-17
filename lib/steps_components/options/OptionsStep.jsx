import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Option from './Option';
import OptionElement from './OptionElement';
import Options from './Options';
import OptionsStepContainer from './OptionsStepContainer';

class OptionsStep extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.renderOption = this.renderOption.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
  }

  componentWillMount() {
    const { step, renderedSteps } = this.props;

    if (typeof step.options === 'function') {
      const newOptions = step.options(step, renderedSteps);
      this.setState({ options: newOptions });
    } else {
      this.setState({ options: this.props.step.options });
    }
  }

  onOptionClick({ value }) {
    this.props.triggerNextStep({ value });
  }

  renderOption(option) {
    const { bubbleOptionStyle } = this.props;
    const { user } = this.props.step;
    const { value, label } = option;

    return (
      <Option
        key={value}
        className="rsc-os-option"
      >
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
  }

  render() {
    const { options } = this.state;

    return (
      <OptionsStepContainer className="rsc-os">
        <Options className="rsc-os-options">
          {_.map(options, this.renderOption)}
        </Options>
      </OptionsStepContainer>
    );
  }
}

OptionsStep.propTypes = {
  step: PropTypes.object.isRequired,
  renderedSteps: PropTypes.array,
  triggerNextStep: PropTypes.func.isRequired,
  bubbleOptionStyle: PropTypes.object.isRequired,
};

OptionsStep.defaultProps = {
  renderedSteps: {},
};

export default OptionsStep;
