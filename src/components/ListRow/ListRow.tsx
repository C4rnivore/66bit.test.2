import { FC } from 'react';
import './ListRow.css'
import { useNavigate } from 'react-router-dom';

const ListRow:FC<{
    name:string, 
    position:string, 
    telephone:string, 
    birthDate:string,
    id:number}> = (props) => {
    let navigate = useNavigate(); 

    const naigateTo = (path:string) =>{  
        navigate(path);
    }

    return (
        
            <tr className="list_row" onClick={ ()=> naigateTo(`/users/${props.id}`)}>
                <td className='row_first'>{props.name}</td>
                <td>{props.position}</td>
                <td>{props.telephone}</td>
                <td className='row_last'>{props.birthDate}</td>
            </tr>
        
    );
}

export default ListRow;