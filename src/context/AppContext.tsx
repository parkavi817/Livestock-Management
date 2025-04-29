import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, Language } from '../types';
import { initialState } from '../data/mockData';

// Define action types
type ActionType = 
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'ADD_ANIMAL'; payload: any }
  | { type: 'UPDATE_ANIMAL'; payload: any }
  | { type: 'DELETE_ANIMAL'; payload: string }
  | { type: 'ADD_HEALTH_RECORD'; payload: any }
  | { type: 'UPDATE_HEALTH_RECORD'; payload: any }
  | { type: 'DELETE_HEALTH_RECORD'; payload: string }
  | { type: 'ADD_BREEDING_RECORD'; payload: any }
  | { type: 'UPDATE_BREEDING_RECORD'; payload: any }
  | { type: 'DELETE_BREEDING_RECORD'; payload: string }
  | { type: 'ADD_PRODUCTION_RECORD'; payload: any }
  | { type: 'UPDATE_NOTIFICATION_STATUS'; payload: { id: string, status: 'pending' | 'done' | 'snoozed' } };

// Create reducer function
const appReducer = (state: AppState, action: ActionType): AppState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    
    case 'ADD_ANIMAL':
      return { 
        ...state, 
        animals: [...state.animals, action.payload] 
      };
    
    case 'UPDATE_ANIMAL':
      return { 
        ...state, 
        animals: state.animals.map(animal => 
          animal.id === action.payload.id ? action.payload : animal
        )
      };
    
    case 'DELETE_ANIMAL':
      return { 
        ...state, 
        animals: state.animals.filter(animal => animal.id !== action.payload)
      };
    
    case 'ADD_HEALTH_RECORD':
      return { 
        ...state, 
        healthRecords: [...state.healthRecords, action.payload] 
      };
    
    case 'UPDATE_HEALTH_RECORD':
      return { 
        ...state, 
        healthRecords: state.healthRecords.map(record => 
          record.id === action.payload.id ? action.payload : record
        ) 
      };
    
    case 'DELETE_HEALTH_RECORD':
      return { 
        ...state, 
        healthRecords: state.healthRecords.filter(record => record.id !== action.payload) 
      };
    
    case 'ADD_BREEDING_RECORD':
      return { 
        ...state, 
        breedingRecords: [...state.breedingRecords, action.payload] 
      };
    
    case 'UPDATE_BREEDING_RECORD':
      return { 
        ...state, 
        breedingRecords: state.breedingRecords.map(record => 
          record.id === action.payload.id ? action.payload : record
        ) 
      };
    
    case 'DELETE_BREEDING_RECORD':
      return { 
        ...state, 
        breedingRecords: state.breedingRecords.filter(record => record.id !== action.payload) 
      };
    
    case 'ADD_PRODUCTION_RECORD':
      return { 
        ...state, 
        productionRecords: [...state.productionRecords, action.payload] 
      };
    
    case 'UPDATE_NOTIFICATION_STATUS':
      return { 
        ...state, 
        notifications: state.notifications.map(notification => 
          notification.id === action.payload.id 
            ? { ...notification, status: action.payload.status } 
            : notification
        ) 
      };

    default:
      return state;
  }
};

// Create context
interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// Create provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Create custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};