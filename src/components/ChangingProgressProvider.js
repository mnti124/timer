import React, {useState, useEffect} from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useStateValue} from '../StateProvider';

let once = 0;
function ChangingProgressProvider({progressBar, min,size}) {
    
    const [{pomodoroMaxValue}, dispatch] = useStateValue();
    console.log(pomodoroMaxValue)
    const n = min < 1? pomodoroMaxValue:min;
    console.log(n)
    //Progress Bar Value Index
    const [valueIndex, setValue] = useState(0);
    //User Input Time
    const [minute, setTime] = useState(n);
    //Seconds
    let [sec, setSeconds] = useState(59);
    const [clicked, setClicked] = useState(false);

    // console.log(min)
    
    //Handler
    const handleButton = ()=>{
        setClicked(!clicked);
    }

    //when the compunent mounts: we want to increase the progress counter
    useEffect(()=>{
        
        if(clicked){
            once = 1;
            let interval = setInterval(()=>{
                // setValueIndex((valueIndex + 1) % values.length);
                
                if(valueIndex >= progressBar.length - 1){
                    setValue(0);
                    setSeconds(0);
                }
                else if(minute < 1 && sec < 1){
                    setClicked(false);
                    once = 0;
                }
                else{
                    if(sec < 1 ){
                        
                        setTime(minute - 1);
                        setSeconds(59);
                    }else{
                        setSeconds(sec - 1);
                        setValue((valueIndex + 1)% progressBar.length)
                    }
                    
                   
                }
            },1000)
            return ()=> clearInterval(interval)
        
        }else{
             if(once === 0){
                setValue(0);
                setTime(n);
                setSeconds(0)
                //console.log(valueIndex)
            }
            
        }
         
    },[valueIndex, minute,clicked, sec, progressBar,min])
    //value={value - .1} text={value < 10?`0${value}:${sec}`: `${value}:${sec}`} minValue={`0`} maxValue={`${valuePassed}`}
    //console.log(minute)
    //console.log(progressBar);
    let displayTime = (sec < 10)? minute + ':'+ '0'+sec : minute +':'+sec;
    console.log(minute)
    return (
        <>
            <CircularProgressbar
            value={progressBar[valueIndex]}
            text={displayTime}
            styles={buildStyles({
                pathTransitionDuration: .15,
                textSize: size
            })}
            />
            <div className="play__pause" onClick={handleButton} style={{"font-size": size}}>{clicked?'PAUSE':'PLAY'}</div>
        </>
    )
}

export default ChangingProgressProvider
