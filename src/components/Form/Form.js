import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import Textarea from '../Textarea/Textarea';
import './Form.css';

class Form extends PureComponent {
  render() {
    const { handleSubmit, reset, onFormFill, commandsText } = this.props;
    return (
      <form className="Form" onSubmit={handleSubmit}>
        <div className="Form__field">
          <label htmlFor="commands">Commands</label>
          <Field name="commands" component={Textarea} type="text" onFormFill={onFormFill} data={commandsText} />
        </div>
        <div className="Form__buttons">
          <button className="Form__button" type="submit">Submit</button>
          <button className="Form__button" type="reset" onClick={reset}>Reset</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({ form: 'place' })(Form);
