import style from "../../styles/addUser.module.css";
import { useState, useRef } from "react";
import imagee from "../../public/images/profile.jpg";
// import { AiFillCloseCircle } from "react-icons/ai";
import UserInfoPopup from '../../components/UserInfoPopup/UserInfoPopup'
import axios from 'axios';

function CinFormation() {
  return (
    <>
		<UserInfoPopup />
    </>
  );
}

export default CinFormation;
