import storage from 'redux-persist/lib/storage'; // or whichever storage mechanism you prefer
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root', // key for the root of the state object
  storage, // storage mechanism
  // Additional configuration options can be added here if needed
};

export default persistConfig;
