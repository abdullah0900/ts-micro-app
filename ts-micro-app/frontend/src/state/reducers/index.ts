import { combineReducers } from "redux";

// Import all reducers
import dataReducers from "./dataReducers";

const reducers = combineReducers({
    data: dataReducers
})

export default reducers;