import React from 'react'
import '../App.css'
import TimerSection from './TimerSelection';
import ProgressBar from './ProgressBar';
function PomodoroContainer() {
    return (
        <div className="pomodoro__container">
            <TimerSection/>
            <ProgressBar />
        </div>
    )
}

export default PomodoroContainer
