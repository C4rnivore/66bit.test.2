import axios from "axios"
import { Filters } from "./useFilters"
import { parseFilters } from "./filtersParser"

const api = 'https://frontend-test-api.stk8s.66bit.ru/api/Employee?'

export interface EmployeeDTO{
    birthdate:string,
    dateOfEmployment:string,
    gender:string,
    id:number,
    name:string,
    phone:string,
    photo:string,
    position:string,
    stack:Array<string>,
}

export async function fetchData(page:number, filters:Filters,  count:number = 10):Promise<Array<EmployeeDTO>>{
    filters = parseFilters(filters)

    var response = await axios({
        method:'GET',
        url: buildQuery(page, count, filters.query, filters.gender[0], filters.position[0], filters.stack),
    })
    
    return response.data
}

export async function fetchUserById(id:number):Promise<EmployeeDTO> {
    var response = await axios({
        method:'GET',
        url: `https://frontend-test-api.stk8s.66bit.ru/api/Employee/${id}`
    })
    
    return response.data
}

function buildQuery( page:number, 
    count:number, 
    name:string, 
    gender:string,
    position:string,
    stack:Array<string>){
        var res = api
        res = res + `Page=${page}&`
        res = res + `Count=${count}&`
        if(name !== '')
            res = res + `Name=${name}&`
        if(gender !== undefined)
            res = res + `Gender=${gender}&`
        if(position !== undefined)
            res = res + `Position=${position}&`
        stack.forEach(el=>{
            res = res + `Stack=${el}&`
        })
        return res.substring(0, res.length - 1);
}