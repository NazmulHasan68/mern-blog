import { configureStore ,combineReducers} from '@reduxjs/toolkit'
import userReducer from './userSlice/userSlice'
import themeReducer from './theme/ThemSlice'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

const rootReducer = combineReducers({
    user : userReducer,
    theme: themeReducer
})
const persistConfig ={
    key:'root',
    storage,
    version:1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDetaultMiddleware)=>getDetaultMiddleware(
    {serializableCheck:false}
  )
})

export const persistor = persistStore(store)