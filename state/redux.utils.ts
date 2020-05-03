export type ActionType<T> = {
  type: string;
  payload: T;
};

export type ReducersType<T> = Record<string, (state: T, action: ActionType<T>) => T>;

export function createActionTypes(filename: string, typeObj: Record<string, string>) {
  for (const prop in typeObj) {
    if (typeObj.hasOwnProperty(prop)) {
      typeObj[prop] = typeObj[prop] + filename;
    }
  }
  return typeObj;
}

export function createAction<T>(type: string) {
  return (payload: T) => {
    return {
      type,
      payload,
    };
  };
}

export function createReducer<T>(initial: T, reducersObj: ReducersType<any>) {
  return (state = initial, action: ActionType<any>): T => {
    const func = reducersObj[action.type];

    if (func) return func(state, action);

    return state;
  };
}
