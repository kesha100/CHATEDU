import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './features/profile-slicer/ProfileSlicer'
import adminReducer from './features/admin-survay/AdminSlicer'
import languageReducer from './features/language/LanguageSlicer'

export const makeStore = () => {
    return configureStore({
        reducer: {
            survey: profileReducer,
            admin: adminReducer,
            lang: languageReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']