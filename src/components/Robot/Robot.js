import React, { PureComponent } from 'react';
import './Robot.css';

class Robot extends PureComponent {
  render() {
    const { x, y, rotationAngle, onTransitionEnd } = this.props;
    return (
      <div
        role='Img'
        className='Robot'
        style={{ transform: `rotate(${rotationAngle}deg)`, left: `${(20 * x)}%`, bottom: `${(20 * y)}%`}}
        onTransitionEnd={onTransitionEnd}
      />
    );
  }
}

export default Robot;
