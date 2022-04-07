import styles from '../../styles/users/users.module.css'
import { AiOutlineSearch } from "react-icons/ai";
import users from '../../pages/users';
import image from '../../public/images/profile.jpg'
import iconSearch from '../../public/images/search.png'
import Link from 'next/link'
import {useState} from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import UsersCart from './UsersCart'
interface UsersType {
    placeholder: string;
    usersData:  any | any[];
}

const Users = (props:UsersType) => {
    const [filterData, setFilterData] = useState<any>(props.usersData);
    const [userStatus, setStatus] = useState<boolean>(false);
    // let userStatus: boolean = true;
    const router = useRouter()
    const handleChange = (e: any) => {
        const searchWord: string = e.target.value;
        const newFilter = props.usersData.filter((value: any) => {
            return (value.first_name.includes(searchWord));
        });
        setFilterData(newFilter);
    }
    const handleClick = (e: any) => {
        e.preventDefault();
    }
    const ChangeStatus = (e: any) => {
        userStatus ? setStatus(false) : setStatus(true);
    }
    return (
        <div className={styles.globalContainer}>
        <div className={styles.container}>
            <div className={styles.SearchBar}>
                {/* <button className={userStatus? styles.buttonStatusOFF : styles.buttonStatusOn} onClick={(e:any) => ChangeStatus(e, )}>{userStatus? "Offline" : "Online"}</button> */}
                <form action="">
                    <input type="search" placeholder={props.placeholder} className={styles.SearchInput}  onChange={(e: any) => handleChange(e, )}/>
                    <input type="image" name="submit" src={iconSearch.src} onClick={(e: any) => handleClick(e, )} className={styles.searchButton}/>
                </form>
            </div>
            <div className={styles.child}>
                <UsersCart data={filterData} status={userStatus}/>
            </div>
        </div>
        </div>
    );
}

export default Users;