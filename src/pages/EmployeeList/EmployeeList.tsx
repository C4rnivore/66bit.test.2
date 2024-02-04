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
    const [prevCount, setPrevCount] = useState<number>(0)    
    const [contentLoading,setContentLoading] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')

    const {filters,setFilters} = useFilters()

    useEffect(()=>{
        if(filters.length === 0 && input==='') fetchDataWithoutParams();
        else if(input === ''){
            if(prevCount !== filters.length)
                setPagesLoaded(cur=>cur=1)

            fetchDataByFilters(filters);}
        else fetchDataByFiltersAndName(filters, input);

    },[pagesLoaded, filters])

    function fetchDataWithoutParams(){
        fetchData(pagesLoaded).then(
            response =>{
                if(prevCount !== 0){
                    setRes([...response])
                    setPrevCount(0)
                }
                else setRes([...res, ...response])
        })
    }

    function fetchDataByFilters(filters:Array<string>){
        let parsed = parseFilters(filters)

        fetchData(pagesLoaded, 10,'',parsed.gender[0],parsed.position[0], parsed.stack)
        .then(response=>{
            if(prevCount !== filters.length){
                setRes([...response])
                setPrevCount(filters.length)
            }
            else setRes([...res, ...response])
        })
    }

    function fetchDataByFiltersAndName(filters:Array<string>, name:string){
        let parsed = parseFilters(filters)

        fetchData(pagesLoaded, 10, name ,parsed.gender[0],parsed.position[0], parsed.stack)
        .then(response=>{
            setRes(response)
        })
    }

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
    const onTouchStart = (e:TouchEvent) =>{
        var preloadTreshold = 200
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight-preloadTreshold && !contentLoading) {
            setContentLoading(true)
            setPagesLoaded(cur => cur + 1)
        }
    }

    return ( 
        <section>
            <Navigation/>
            <Filters fetchCallback={fetchDataByFiltersAndName} inputManager={inputStateChange}/>
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