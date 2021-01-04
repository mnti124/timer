import React, {useState} from 'react'
import './TimerSelection.css';
import {useStateValue} from '../StateProvider';

function TimerSelection() {
    const [{pomodoroMaxValue}, dispatch] = useStateValue();
    //Selections States
    const [clickedPomodoro, setClickedPomodoro] = useState(false);
    const [clickedShort, setClickedShort] = useState(false);
    const [clickedLong, setClickedLong] = useState(false);

    //Handlers
    const handlePomodoroOption = ()=>{
        setClickedPomodoro(!clickedPomodoro);
        if(!clickedPomodoro){
            dispatch({
                type:'SET_POMODORO',
                value: 25
            })
        }else{
            dispatch({
                type:'SET_POMODORO',
                value: 0
            })
        }
        

        setClickedShort(false);
        setClickedLong(false);
    }

    const handleShortOption = ()=> {
        setClickedShort(!clickedShort);
        setClickedPomodoro(false)
        setClickedLong(false)
    }

    const handleLongOption = ()=> {
        setClickedLong(!clickedLong);
        setClickedShort(false);
        setClickedPomodoro(false)
    }
    return (
        <div className="timer__selection__container">
            <h2>pomodoro</h2>
            <div className="selection__container__option">
                <div className={clickedPomodoro? 'pomodoro active' : 'pomodoro'} onClick={handlePomodoroOption}>pomodoro</div>
                <div className={clickedShort? 'short active' : 'short'} onClick={handleShortOption}>short</div>
                <div className={clickedLong? 'long active': 'long'} onClick={handleLongOption}>long</div>
            </div>
            
        </div>
    )
}

export default TimerSelection
