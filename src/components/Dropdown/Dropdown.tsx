import { FC, useEffect, useRef } from "react";
import './Dropdown.css'
import arrow from '../../assets/arrow.png'
import useFilters from "../../utils/useFilters";

const Dropdown:FC<{
    title:string, 
    options:Array<string>,
    mobile:boolean 
}> = (props) => {
    const dropdownBtn = useRef<HTMLButtonElement>(null)
    const {filters, setFilters} = useFilters()

    // useEffect(()=>{
    //     let content = document.querySelectorAll('.dropdown_content')
    //     let clickedOnContent = false
    //     window.onclick = function(event){
    //         content.forEach(el => {
    //             if(event.target?.matches(el)){
    //                 clickedOnContent = true
    //             }  
    //         })
    //         if(!clickedOnContent)
    //             content.forEach(el =>{
    //                 el.classList.remove('show')
    //         })
    //     }
    // },[])

    const dropdownClickHandler = () =>{
        let id = props.mobile? 'dropdown_mobile_' + props.title : 'dropdown_' + props.title       
        
        document.getElementById(id)?.classList.toggle("show");
        dropdownBtn.current?.classList.toggle('dropdown_btn_active')
    }

    const handleCheckClick = (name:string) =>{
        let id = props.mobile? 'check-mobile-' + name : 'check-' + name
        let check = document.getElementById(id) as HTMLInputElement

        if(check?.checked){
            setFilters([...filters, name])
        }
        else{
            let updated = filters.filter(val => val != name)        
            setFilters(updated)
        }  
    }

    return ( 
        <div className="dropdown">

            <button ref={dropdownBtn} onClick={dropdownClickHandler} className="dropdown_btn">
                <span>{props.title}</span>
                <img src={arrow} alt="" />
            </button>

            <div  id={props.mobile? 'dropdown_mobile_' + props.title : 'dropdown_' + props.title } 
            className="dropdown_content">
                {props.options.map((option, index)=>(
                    <div key={index} className="dropdown_option_container">
                        <span className="dropdown_option" key={index}>{option}</span>
                        <input 
                            id={ props.mobile? 'check-mobile-' + option : 'check-' + option} 
                            type='checkbox' 
                            onClick={()=>handleCheckClick(option)} 
                        />
                    </div>  
                ))}
            </div>

        </div> 
     );
}

export default Dropdown;