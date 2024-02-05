import useFilters, { Filters } from "./useFilters"

const PositionsOptions:Array<string> = ['Frontend-разработчик', 'Backend-разработчик', 'Аналитик', 'Менеджер', 'Дизайнер']
const GenderOptions:Array<string> = ['Мужской', 'Женский']
const StackOptions:Array<string> = ['CSharp', 'React', 'Java', 'PHP', 'Figma', 'Word']

const locales = new Map()
locales.set('Frontend-разработчик','Frontend')
locales.set('Backend-разработчик','Backend')
locales.set('Аналитик','Analyst')
locales.set('Менеджер','Manager')
locales.set('Дизайнер','Designer')
locales.set('Мужской','Male')
locales.set('Женский','Female')

export const parseFilters = (filters:Filters):Filters =>{
    let result:Filters = {
        position:[],
        gender:[],
        stack:[],
        query:''
    }

    filters.position.forEach(el=>{
        if(PositionsOptions.includes(el))
            result.position.push(locales.get(el))
    })
    filters.gender.forEach(el=>{
        if(GenderOptions.includes(el))
            result.gender.push(locales.get(el))
    })
    filters.stack.forEach(el=>{
            result.stack.push(el)
    })

    result.query = filters.query
    
    return result
}

export const deleteFromFilters = (filters:Filters, filterName:string):Filters =>{
    let result:Filters = {...filters}

    if(result.position.includes(filterName)){
        result.position = result.position.filter(val => val != filterName)
        return result
    }

    if(result.gender.includes(filterName)){
        result.gender = result.gender.filter(val => val != filterName)
        return result
    }

    if(result.stack.includes(filterName)){
        result.stack = result.stack.filter(val => val != filterName)
        return result
    }    
    return result
}

export const addToFilters = (filters:Filters, filterName:string, fieldName:string):Filters =>{
    let result:Filters = {...filters}

    switch (fieldName) {
        case 'Должность':
            if(!result.position.includes(filterName))
                result.position = [...result.position, filterName]
            break;

        case 'Пол':
            if(!result.gender.includes(filterName))
                result.gender = [...result.gender, filterName]
            break;

        case 'Стек технологий':
            if(!result.stack.includes(filterName))
                result.stack= [...result.stack, filterName]
            break;
    }

    return result
}
