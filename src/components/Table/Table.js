import React, { PureComponent } from 'react';
import Robot from '../Robot/Robot';
import './Table.css';

class Table extends PureComponent {
  render() {
    const { x, y, rotationAngle, onTransitionEnd } = this.props;
    return (
      <div className="Table">
        <Robot
          x={x}
          y={y}
          rotationAngle={rotationAngle}
          onTransitionEnd={onTransitionEnd}
        />
      </div>
    );
  }
}

export default Table;
