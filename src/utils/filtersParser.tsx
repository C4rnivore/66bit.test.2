const PositionsOptions:Array<string> = ['Frontend-разработчик', 'Backend-разработчик', 'Аналитик', 'Менеджер', 'Дизайнер']
const GenderOptions:Array<string> = ['Мужской', 'Женский']
const StackOptions:Array<string> = ['CSharp', 'React', 'Java', 'PHP', 'Figma', 'Word']

interface ParsedFilters {
    position: Array<string>;
    gender: Array<string>;
    stack: Array<string>;
}

const locales = new Map()
locales.set('Frontend-разработчик','Frontend')
locales.set('Backend-разработчик','Backend')
locales.set('Аналитик','Analyst')
locales.set('Менеджер','Manager')
locales.set('Дизайнер','Designer')
locales.set('Мужской','Male')
locales.set('Женский','Female')



export const parseFilters = (filters:Array<string>):ParsedFilters =>{
    let result:ParsedFilters = {
        position:[],
        gender:[],
        stack:[]
    }
    
    filters.forEach(el =>{
        if(PositionsOptions.includes(el))
            result.position.push(locales.get(el))
        else if(GenderOptions.includes(el))
            result.gender.push(locales.get(el))
        else
            result.stack.push(el)
    })

    return result
}
