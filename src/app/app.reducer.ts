interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
}

export function appReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case 'START_LOADING':
      return {
        isLoading: true
      };
    case 'STOP_LOADING':
      return {
        isLoading: false
      };
  }
  return state;
}
