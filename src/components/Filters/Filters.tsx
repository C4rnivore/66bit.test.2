import useFilters from "../../utils/useFilters";
import Dropdown from "../Dropdown/Dropdown";
import cross from '../../assets/cross.png'
import './Filters.css'
import { FC, SetStateAction, useState } from "react";

const Filters:FC<{fetchCallback:Function, inputManager:Function}> = (props) => {
    const PositionsOptions:Array<string> = ['Frontend-разработчик', 'Backend-разработчик', 'Аналитик', 'Менеджер', 'Дизайнер']
    const StackOptions:Array<string> = ['CSharp', 'React', 'Java', 'PHP', 'Figma', 'Word']
    const {filters, setFilters} = useFilters()
    const [query, setQuery] = useState<string>('')

    const deleteFilter = (name:string) =>{
        let check = document.getElementById('check-' + name) as HTMLInputElement
        let check_mobile = document.getElementById('check-mobile-' + name) as HTMLInputElement

        check.checked = false
        check_mobile.checked = false

        let updated = filters.filter(val => val != name)        
        setFilters(updated)
    }

    const handleQueryChange = (e: { target: { value: SetStateAction<string>; }; }) =>{
        props.inputManager(e.target.value)
        setQuery(e.target.value);
    }

    return ( 
        <div className="filters_container">
            <div className="filters_top">
                <h1>Список сотрудников</h1>
                <div className="dropdowns">
                    <Dropdown mobile={false} title="Должность" options={PositionsOptions}/>
                    <Dropdown mobile={false} title="Пол" options={["Мужской", "Женский"]}/>
                    <Dropdown mobile={false} title="Стек технологий" options={StackOptions}/>
                </div>
            </div>
            <div className="filters_md">
                <input 
                    type="text" 
                    placeholder="Поиск" 
                    className="filters_input"
                    onChange={handleQueryChange}/>
            </div>
            <div className="dropdowns-mobile">
                    <Dropdown mobile={true} title="Должность" options={PositionsOptions}/>
                    <Dropdown mobile={true} title="Пол" options={["Мужской", "Женский"]}/>
                    <Dropdown mobile={true} title="Стек технологий" options={StackOptions}/>
            </div>
            <div className="filters_bottom">
                <div className="filters_list">
                    <span>Выбранные фильтры:</span>
                    {filters.map((filter, index) => (
                        <div className="filter_item" key={index}>
                            <button className="filter_item_close" onClick={() => deleteFilter(filter)}>
                                <span>&#9587;</span>
                            </button>
                            <span>{filter}</span>
                        </div>
                    ))}
                </div>
                <button className="filters_btn" onClick={ ()=> props.fetchCallback(filters, query)}>Найти</button>
            </div>
        </div> 
    );
}

export default Filters;