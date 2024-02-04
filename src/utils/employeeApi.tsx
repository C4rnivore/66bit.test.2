import axios from "axios"

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

export async function fetchData(
    page:number = 1, 
    count:number = 10, 
    name:string ='', 
    gender:string = '',
    position:string = '',
    stack:Array<string> = []):Promise<Array<EmployeeDTO>>{
    
    var response = await axios({
        method:'GET',
        url: buildQuery(page,count, name, gender, position,stack),
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
        if(gender !== '')
            res = res + `Gender=${gender}&`
        if(position !== '')
            res = res + `Position=${position}&`
        stack.forEach(el=>{
            res = res + `Stack=${el}&`
        })

        return res.substring(0, res.length - 1);
}