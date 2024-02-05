import { useEffect, useState } from "react";
import Filters from "../../components/Filters/Filters";
import Navigation from "../../components/Navigation/Navigation";
import ListRow from "../../components/ListRow/ListRow";
import './EmployeeList.css'
import { EmployeeDTO, fetchData } from "../../utils/employeeApi";
import useFilters from "../../utils/useFilters";
import { parseFilters } from "../../utils/filtersParser";

function EmployeeList() {
    const [res, setRes] = useState<Array<EmployeeDTO>>([])
    const [pagesLoaded, setPagesLoaded] = useState<number>(1)   
    const [contentLoading,setContentLoading] = useState<boolean>(false)
    // const [blockRequest, setBlockRequest] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')
    const [prevFilters, setPrevFilters] = useState<any>(null)
    const {filters,setFilters} = useFilters()

    useEffect(()=>{
        fetchData(pagesLoaded, filters)
        .then(response=>{
            if(prevFilters === filters && response.length !== 0)
                setRes([...res, ...response])
            else{
                if(response.length !== 0){
                    setRes([ ...response])
                    setPagesLoaded(1)
                    setPrevFilters(filters)
                }
            }
        })    
    },[pagesLoaded, filters])

    function inputStateChange(input:string){
        if(input === '')
        setInput(input)
    }

    useEffect(()=>{
        window.onscroll = onPageScroll
        window.ontouchstart = onTouchStart
    },[])

    const onPageScroll = () =>{
        var preloadTreshold = 1
        if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - preloadTreshold  && !contentLoading) {
            setContentLoading(true)
            setPagesLoaded(cur=> cur + 1)
        }
    }
    const onTouchStart = () =>{
        var preloadTreshold = 200
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight-preloadTreshold && !contentLoading) {
            setContentLoading(true)
            setPagesLoaded(cur => cur + 1)
        }
    }

    return ( 
        <section>
            <Navigation/>
            <Filters inputManager={inputStateChange}/>
            <table>
                <tbody>
                    <tr className="table_header">
                        <th className='row_first'>ФИО</th>
                        <th>Должность</th>
                        <th>Телефон</th>
                        <th className='row_last'>Дата рождения</th>
                    </tr>
                    {res.map((emp, index)=>(
                        <ListRow 
                            key={index}  
                            id={emp.id} 
                            name={emp.name} 
                            position={emp.position} 
                            telephone={emp.phone}
                            birthDate={emp.birthdate}/>
                    ))}
                </tbody>
            </table>
           

        </section> 
    );
}

export default EmployeeList;