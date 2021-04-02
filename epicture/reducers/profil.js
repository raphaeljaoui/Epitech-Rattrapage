const initialState = {
    profil: "rj012"
}

export default function (state = initialState, action){
    // return {
    //     data: "rj012"
    // }
    if (action.type === "GET_PROFIL"){
        return {
            data: action.value
        }
    }
    return state
}
