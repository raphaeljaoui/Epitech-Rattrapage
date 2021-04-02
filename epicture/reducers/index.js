import { combineReducers } from 'redux'
import ProfilReducer from './profil'

const rootReducer = combineReducers({
    profil : ProfilReducer
})

export default rootReducer