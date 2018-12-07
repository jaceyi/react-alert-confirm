import React, {Component} from 'react';

class Button extends Component {
  render() {
    const {
      type,
      children
    } = this.props;

    return (
      <button
        className={`alert-confirm-button ${type || ''}`}
        {...this.props}>
        {children}
      </button>
    )
  }
}

export default Button;
