import React, {useState, useEffect} from 'react'
import './ProgressBar.css';
import ChangingProgessProvider from './ChangingProgressProvider';
import Modal from 'react-modal';

const progressBarTime = [];
for(let i = 100; i > -1.7; i-=1.7){
   
    progressBarTime.push(i);
    
}

Modal.setAppElement('#root');
function ProgressBar() {
    const modalStyle = {
        content: {
            width:    '500px',
            height:   '400px',
            position: 'fixed',
            top:      '442px',
            left:     '50%',
            right:    '50%',
            bottom:   '50%',
            transform:'translate(-50%,-75%)',
            padding:  '0',
            background: 'white',
            outline:   'none'
        }
    }
    
    const [modalIsOpen, setModalStatus] = useState(false);
    //Time States
    const [pomodoroMinutes, setPomodoroMinutes] = useState(0);
    const [short, setShortMinutes] = useState(0);
    const [long, setLongMinutes] = useState(0);
    //Font States
    const [fontSize, setFontSize] = useState('');
    const [fontLargeBgColor, setLargeBgColor] = useState(false);
    const [fontMediumBgColor, setMediumBgColor] = useState(false);
    const [fontSmallBgColor, setSmallBgColor] = useState(false);

    const [isApplied, setIsApplied] = useState(false);

    //Modal Handler
    const openModal = ()=>{
        setModalStatus(true);
    }

    const closeModal = ()=>{
        handleApply();
        setModalStatus(false);
        
    }

    //Time Handler
    const currentPomodoroNumber = (e)=>{
        e.preventDefault();
            
        setPomodoroMinutes(e.target.value);
        
        setShortMinutes(0);

    }

    const currentShortNumber = (e)=>{
        e.preventDefault();
        setShortMinutes(e.target.value);
        setPomodoroMinutes(0);
        setLongMinutes(0);
    }

    const currentLongNumber = (e)=>{
        e.preventDefault();
        setLongMinutes(e.target.value);
        setPomodoroMinutes(0);
        setShortMinutes(0);
    }
    const handleApply = ()=>{
        setIsApplied(true);
    }

    //Fonts Handler
    const fontLarge = ()=>{
        setFontSize('30px');
        setLargeBgColor(true);
        setMediumBgColor(false);
        setSmallBgColor(false);
    }
    const fontMedium = ()=>{
        setFontSize('20px');
        setMediumBgColor(true);
        setLargeBgColor(false);
        setSmallBgColor(false);
    }
    const fontSmall = ()=>{
        setFontSize('15px');
        setSmallBgColor(true);
        setLargeBgColor(false);
        setMediumBgColor(false);
    }
    let displayProgressBar = ()=>{
        if(isApplied){
            //Establishes which timer to use
            if(short === 0 && long === 0){
                return <ChangingProgessProvider progressBar={progressBarTime} min={pomodoroMinutes} size={fontSize}/>
            }
            if(pomodoroMinutes === 0 && long === 0){
                console.log(progressBarTime)
                return <ChangingProgessProvider progressBar={progressBarTime} min={short} size={fontSize}/>
            }
            if(pomodoroMinutes === 0 && short === 0){
                 return <ChangingProgessProvider progressBar={progressBarTime} min={long} size={fontSize}/>
            }
        }else{
            return <ChangingProgessProvider progressBar={[]} min={"0"}/>
        }
    }
    useEffect(() => {
        displayProgressBar();
    }, [pomodoroMinutes,short,long, isApplied])
    return (
        <div className="progress__bar">
            {
                displayProgressBar()
            }
            
            <div className="settings"><i className="fa fa-cog" onClick={openModal}></i></div>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Settings"
            style={modalStyle}
            className="modal"
            overlayClassName="overlay"
            >
                <div className="modal__title">
                    <h1>Settings</h1>
                    <i className="fa fa-times" onClick={closeModal}></i>
                </div>
                <hr/>
                <div className="modal__time__selection">
                    {/* TIME */}
                    <h3 className="title">TIME (MINUTES)</h3>
                    <div className="modal__selection__wrapper">
                        <div className="modal__selection__option">
                            <label className="modal__selection__label">pomodoro</label>
                            <i className="fa fa-chevron-up"></i>
                            <input type="number" min="0" max="25" value={`${pomodoroMinutes}`} onChange={currentPomodoroNumber}/>
                            <i className="fa fa-chevron-down"></i>
                        </div>

                        <div className="modal__selection__option">
                            <label className="modal__selection__label">short break</label>
                            <i className="fa fa-chevron-up short__up"></i>
                            <input type="number" min="0" max="5" value={`${short}`} onChange={currentShortNumber}/>
                            <i className="fa fa-chevron-down short__down"></i>
                        </div>

                        <div className="modal__selection__option">
                            <label className="modal__selection__label">long break</label>
                            <i className="fa fa-chevron-up long__up"></i>
                            <input type="number" min="0" max="15" value={`${long}`} onChange={currentLongNumber}/>
                            <i className="fa fa-chevron-down long__down"></i>
                        </div>
                    </div>
                    <hr/>
                    {/* FONTS */}
                    <div className="modal__fonts">
                        <h3 className="title">Font</h3>
                        <div className="modal__fonts__selection">
                            <div className={fontLargeBgColor?'font__pomodoro font__active':'font__pomodoro'} onClick={fontLarge}><span>Aa</span></div>
                            <div className={fontMediumBgColor?'font__short font__active':'font__short'} onClick={fontMedium}><span>Aa</span></div>
                            <div className={fontSmallBgColor?'font__long font__active':'font__long'} onClick={fontSmall}><span>Aa</span></div>
                        </div>
                    </div>
                    <hr/>
                    {/* COLORS */}
                    <div className="modal__color">
                        <h3 className="title">COLOR</h3>
                        <div className="modal__color__selection">
                            <div className="yellow__green"></div>
                            <div className="bluish"></div>
                            <div className="soft__orange"></div>
                        </div>
                    </div>
                   
                </div>
                <button onClick={closeModal}>Apply</button>
            </Modal>
        </div>
    )
}

export default ProgressBar
