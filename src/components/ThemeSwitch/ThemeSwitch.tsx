import { useRef, useState } from 'react';
import './ThemeSwitch.css'

function ThemeSwitch() {
    const switchBall = useRef<HTMLDivElement>(null)
    const [curTheme, setCurTheme] = useState<string>('light')
    const root = document.querySelector<HTMLElement>(':root');

    const toggleThemeSwitch = () =>{
        if(switchBall === null)
            return
        switchBall.current?.classList.toggle('switch_ball_toggled')

        if(curTheme === 'light'){
            root?.style.setProperty('--main-color', `#292929`)
            root?.style.setProperty('--hover-color', `#3E3E3E`)
            root?.style.setProperty('--text-color', `#FFFFFF`)
            setCurTheme('dark')
        }
        else{
            root?.style.setProperty('--main-color', `#FFFFFF`)
            root?.style.setProperty('--hover-color', `#F2F2F2`)
            root?.style.setProperty('--text-color', `#000000`)
            setCurTheme('light')
        }
    }

    return ( 
        <button className="theme_switch" onClick={toggleThemeSwitch}>
            <div ref={switchBall} className="switch_ball">
            </div>
        </button> 
    );
}

export default ThemeSwitch;