export const initialState = {
    pomodoroMaxValue: 0
}

const reducer = (state, action)=>{
    switch(action.type){
        case 'SET_POMODORO':
            return{
                ...state,
                pomodoroMaxValue: action.value
            }
        default:
            return state;
    }
}

export default reducer;