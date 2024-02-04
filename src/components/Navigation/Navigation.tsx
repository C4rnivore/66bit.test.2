import { Link } from 'react-router-dom';
import corner from '../../assets/cornerIcon.png'
import './Navigation.css'
import { FC } from 'react';

const Navigation:FC<{active?:string}> = (props) => {
    return ( 
        <nav className='navigation'>
            <Link to={'#'}>Главная</Link>
            <img src={corner} alt="" draggable='false' unselectable={'on'}/>
            <Link to={'/'}>Список сотрудников</Link>
            {props.active !== undefined? 
            <>
                <img src={corner} alt="" draggable='false'  unselectable={'on'}/>
                <Link to={'/'}>{props.active}</Link>
            </>
            :<></>}
        </nav> 
    );
}

export default Navigation;