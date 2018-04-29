import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Form from '../Form/Form';
import Table from '../Table/Table';
import { setCommandList, makeMovementStep, finishMovement, catchError } from '../../reducers/robotPlace';
import { COMMAND_PLACE } from '../../constants/commands';
import './App.css';

class App extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const { commandsList, robotPlaced} = nextProps
    if(commandsList.length && !robotPlaced && commandsList[0].command !== COMMAND_PLACE) {
      this.props.dispatch(catchError(new Error('You should place the robot first. Use command "PLACE X,Y,DIRECTION"')))
    }
    if (commandsList.length && !robotPlaced && commandsList[0].command === COMMAND_PLACE) {
      setTimeout(() => {
        this.props.dispatch(makeMovementStep(commandsList[0]));
      }, 5000);
    }
  }

  componentDidUpdate() {
    const { commandsList, robotPlaced, nextPosition, steps, isFirstPlaceStep, error, movement } = this.props;
    if (commandsList.length && robotPlaced && !nextPosition && !error && !movement) {
      this.props.dispatch(makeMovementStep(commandsList[0]));
    }
    if (steps.length && isFirstPlaceStep) {
      this.props.dispatch(makeMovementStep({ command: steps[0] }));
    }
  }

  handleFormSubmit = data => {
    try {
      this.props.dispatch(setCommandList(data.commands));
    }
    catch (err) {
      this.props.dispatch(catchError(err));
    }
  }

  handleMovementStep = () => {
    const { steps } = this.props
    if (steps.length) {
      this.props.dispatch(makeMovementStep({ command: steps[0] }));
    }
    else {
      this.props.dispatch(finishMovement());
    }
  }

  render() {
    const { currentPosition: { x, y, direction, rotationAngle }, error, report } = this.props;
    return (
      <div className="App">
        <div className="App__table">
          <Table
            x={x}
            y={y}
            rotationAngle={rotationAngle}
            onTransitionEnd={this.handleMovementStep}
          />
        </div>
        <div className="App__tools">
          <div className="App__form">
            <Form
              onSubmit={this.handleFormSubmit}
            />
            {report && <div className="App__report">{`Output: ${x},${y},${direction}`}</div>}
          </div>
          <div className="App__logs">
            {error && <div className="App__error">{error}</div>}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      robotPlaced: state.place.robotPlaced,
      currentPosition: state.place.currentPosition,
      nextPosition: state.place.nextPosition,
      steps: state.place.steps,
      isFirstPlaceStep: state.place.isFirstPlaceStep,
      commandsList: state.place.commandsList,
      error: state.place.error,
      movement: state.place.movement,
      report: state.place.report
  };
};

export default connect(mapStateToProps)(App);
