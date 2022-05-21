import type { NextPage } from "next";
import styles from "../../styles/login/login.module.css";
import { FcGoogle } from "react-icons/fc";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect } from "react";
import Fire from "../fire/fiere";

const Login = () => {
  const router = useRouter();
  const url: string = "http://10.12.10.1:3000/auth/42";
  // fetchData(url);
  return (
    <div className={styles.login}>
      <p className={styles.Ft_trance}>Ft_Transcendence</p>
      <button className={styles.intra}>
        <a href="http://10.12.10.1:3000/auth/42" className={styles.link}>
          <div className={styles.Fire}>
            <Fire />
          </div>{" "}
          <p className={styles.text}>
            Sign in With <span className={styles.P42}>42</span>Intra
          </p>
        </a>
      </button>
    </div>
  );
};

export default Login;
