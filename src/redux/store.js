import { createStore } from 'redux';
import { createBrowserHistory } from 'history';
import reducers from './reducers/index.reducer';

export const history = createBrowserHistory();
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducers, devTools);
export default store;
