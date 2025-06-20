// External imports
import { useReducer, useCallback } from 'react';

// Types
interface AsyncModuleState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isInitialized: boolean;
}

type AsyncModuleAction<T> =
  | { type: 'LOADING_START' }
  | { type: 'LOADING_SUCCESS'; payload: T }
  | { type: 'LOADING_ERROR'; payload: Error }
  | { type: 'RESET' };

// Reducer
function asyncModuleReducer<T>(
  state: AsyncModuleState<T>,
  action: AsyncModuleAction<T>,
): AsyncModuleState<T> {
  switch (action.type) {
    case 'LOADING_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOADING_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isInitialized: true,
        error: null,
      };
    case 'LOADING_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isInitialized: true,
      };
    case 'RESET':
      return {
        data: null,
        isLoading: false,
        error: null,
        isInitialized: false,
      };
    default:
      return state;
  }
}

// Hook
export function useAsyncModuleLoader<T>(loadModule: () => Promise<T>) {
  const initialState: AsyncModuleState<T> = {
    data: null,
    isLoading: false,
    error: null,
    isInitialized: false,
  };

  const [state, dispatch] = useReducer(asyncModuleReducer<T>, initialState);

  const load = useCallback(async () => {
    if (state.isInitialized) return state.data;

    dispatch({ type: 'LOADING_START' });
    try {
      const result = await loadModule();
      dispatch({ type: 'LOADING_SUCCESS', payload: result });
      return result;
    } catch (error) {
      const errorObj =
        error instanceof Error ? error : new Error(String(error));
      dispatch({ type: 'LOADING_ERROR', payload: errorObj });
      throw errorObj;
    }
  }, [loadModule, state.isInitialized, state.data]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    ...state,
    load,
    reset,
  };
}
