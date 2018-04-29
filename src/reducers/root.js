import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import robotPlaceReducer from './robotPlace';

export default combineReducers({
    [robotPlaceReducer.key]: robotPlaceReducer,
    form: formReducer
});
