import styles from "../../styles/login/login.module.css";
import { useRouter } from "next/router";
import React from "react";

const Login = () => {
  const router = useRouter();
  return (
    <div className={styles.login}>
      <p className={styles.Ft_trance}>Ft_Transcendence</p>
      <button className={styles.intra}>
        <a
          href={`http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/auth/42/callback`}
          className={styles.link}
        >
          <div className={styles.text}>
            <div>
              <p>
                Sign in With <span className={styles.P42}>42</span>Intra
              </p>
            </div>
          </div>
        </a>
      </button>
    </div>
  );
};

export default Login;
