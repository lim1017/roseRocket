import { createStore } from 'redux'
import reducers from './reducers'


export const appStore = createStore(reducers);
