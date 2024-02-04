import { useParams } from 'react-router-dom';
import './EmployeeProfile.css'
import { EmployeeDTO, fetchUserById } from '../../utils/employeeApi';
import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation';

function EmployeeProfile() {
    let {id} = useParams()
    const [userData, setUserdata] = useState<EmployeeDTO>()
    useEffect(()=>{
        fetchUserById(Number(id))
        .then(response =>
            setUserdata(response)
        )
    },[])

    return ( 
        <section>
            <Navigation active={userData?.name}/>
            <div className="user_card">
                <img className='user_card_pfp' src={userData?.photo} alt="" />
                <div className="card_info_container">
                    <h1>{userData?.name}</h1>
                    <h2>{userData?.position}</h2>
                    <ul className='card_stack_container'>
                        {userData?.stack.map((item,index) => (
                            <li key={index} className="user_card_stack_tag">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <ul className='card_stack_container_mobile'>
                {userData?.stack.map((item,index) => (
                    <li key={index} className="user_card_stack_tag">
                        {item}
                    </li>
                ))}
            </ul>
            <div className="card_main_info">
                    <h3>Основная информация</h3>
                    <div className="card_main_info_container">
                        <div className="info_row">
                            <span className='bolder'>Контактный телефон:</span>
                            <span>{userData?.phone}</span>
                        </div>
                        <div className="info_row">
                            <span className='bolder'>Дата рождения:</span>
                            <span>{userData?.birthdate}</span>
                        </div>
                        <div className="info_row">
                            <span className='bolder'>Дата устройства:</span>
                            <span>{userData?.dateOfEmployment}</span>
                        </div>
                    </div>
                </div>
        </section> 
    );
}

export default EmployeeProfile;