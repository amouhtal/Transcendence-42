import styles from '../../styles/users/users.module.css'
import { AiOutlineSearch } from "react-icons/ai";
import users from '../../pages/users';
import image from '../../public/images/profile.jpg'
import iconSearch from '../../public/images/search.png'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import UsersCart from './UsersCart'
import { Loading, Grid } from "@nextui-org/react";

interface UsersType {
    placeholder: string;
    usersData:  any | any[];
}

const Users = (props:any) => {
    const [filterData, setFilterData] = useState<any>(props.usersData); useEffect(() => {setFilterData(props.usersData);setIsLoading(false);},props.userData);
    const [userStatus, setStatus] = useState<boolean>(false);
    const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleChange = (e: any) : void => {
        e.preventDefault();
        const searchWord: string = e.target.value;
        const newFilter = props.usersData.filter((value: any) => {
            return (value.userName.includes(searchWord));
        });
        // console.log(newFilter)
        setFilterData(newFilter);
    }
    const handleClick = (e: any) : void => { e.preventDefault(); }
    const ChangeStatus = (e: any) => {
        userStatus ? setStatus(false) : setStatus(true);
    }
    return (
        <div className={styles.globalContainer}>
        <div className={styles.container}>
            <div className={styles.SearchBar}>
                <form action="" className={styles.Form}>
                    <input type="search"
                    placeholder={props.placeholder}
                    className={styles.SearchInput}
                    onChange={(e: any) => handleChange(e, )}
                    />
                </form>
            </div>
            <div className={styles.child}>
            {
                isLoading ?
                <div className={styles.LoadingContainer}>
                    <Grid><Loading type="points" /></Grid>
                </div>
                :
                <UsersCart data={filterData}
                status={false}
                usersSinvite={props.usersSinvite}
                usersRinvite={props.usersRinvite}
                friends={props.friends}
                setUpdate={props.setUpdate}
                inBlock={props.inBlock}
                update={props.update}
                user={props.user}
                socket={props.socket}/>
            }
            </div>
        </div>
        </div>
    );
}

export default Users;