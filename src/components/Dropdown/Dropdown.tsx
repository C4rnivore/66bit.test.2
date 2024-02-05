import { FC, useEffect, useRef } from "react";
import './Dropdown.css'
import arrow from '../../assets/arrow.png'
import useFilters from "../../utils/useFilters";
import { addToFilters, deleteFromFilters } from "../../utils/filtersParser";

const Dropdown:FC<{
    title:string, 
    options:Array<string>,
    mobile:boolean 
}> = (props) => {
    const dropdownBtn = useRef<HTMLButtonElement>(null)
    const {filters, setFilters} = useFilters()

    useEffect(()=>{
        window.addEventListener("click", function(event) {
            let dropdowns = this.document.querySelectorAll('.dropdown_content')
            let btns = this.document.querySelectorAll('.dropdown_btn')

            if((event.target as HTMLElement)?.closest('.dropdown') === null){
                dropdowns.forEach(div=>div.classList.remove('show'))
                btns.forEach(btn=>btn.classList.remove('dropdown_btn_active'))
            }
        });
    })

    const dropdownClickHandler = () =>{
        let id = props.mobile? 'dropdown_mobile_' + props.title : 'dropdown_' + props.title       
        
        document.getElementById(id)?.classList.toggle("show");
        dropdownBtn.current?.classList.toggle('dropdown_btn_active')
    }

    const handleCheckClick = (name:string, title:string) =>{
        let id = props.mobile? 'check-mobile-' + name : 'check-' + name
        let check = document.getElementById(id) as HTMLInputElement

        if(check?.checked){
            let updated = addToFilters(filters, name, title)
            setFilters(updated)
        } 
        else{
            let updated = deleteFromFilters(filters, name)
            setFilters(updated)  
        }       
    }


    return ( 
        <div className="dropdown">
            <button ref={dropdownBtn} onClick={dropdownClickHandler} className="dropdown_btn">
                <span>{props.title}</span>
                <img src={arrow} alt="" />
            </button>
            <div id={props.mobile? 'dropdown_mobile_' + props.title : 'dropdown_' + props.title }
             className="dropdown_content">
                {props.options.map((option, index)=>(
                    <div key={index} className="dropdown_option_container">
                        <span className="dropdown_option" key={index}>{option}</span>
                        <input 
                            id={ props.mobile? 'check-mobile-' + option : 'check-' + option} 
                            type='checkbox' 
                            onClick={()=>handleCheckClick(option, props.title)}
                        />
                    </div>  
                ))}
            </div>

        </div> 
     );
}

export default Dropdown;