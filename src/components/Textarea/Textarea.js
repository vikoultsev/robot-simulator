import React, { PureComponent } from 'react';
import './Textarea.css';

class Textarea extends PureComponent {
  handleChange = event => {
    const { value } = event.target
    this.props.input.onChange(value);
  }

  render() {
    const { input } = this.props;

    return (
      <textarea {...input} className='Textarea' onChange={this.handleChange}></textarea>
    );
  }
}

export default Textarea;
