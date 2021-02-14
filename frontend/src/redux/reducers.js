import { combineReducers } from "redux";

import campaigns from "./ducks/campaigns";

const rootReducer = combineReducers({
    campaigns: campaigns
});

export default rootReducer;
