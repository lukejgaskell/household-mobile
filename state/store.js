import { createStore } from "redux";

import { reducers } from "./redux";

export const store = createStore(reducers);
