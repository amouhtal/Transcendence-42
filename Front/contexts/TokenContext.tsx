import React, { createContext, useEffect, useState } from 'react'

export const TokenContext: any = createContext();

console.log("im in context");
const TokenContextProvider = (props: any) => {
    const [variableOne, setVariableOne] = useState<any>(`somethingRandom`)
    const [refreshToken, setRefreshToken] = useState<string>("");
    const [accessToken, setAcessToken] = useState<string>("");
    useEffect(() => {
        setRefreshToken(document.cookie.split("accessToken")[0].split("refreshToken")[1].split("%22")[2]);
        setAcessToken(document.cookie.split("accessToken")[1].split("%22")[2]);
    })

    console.log("refreshTokenA=", refreshToken, "\naccessTokenA=",accessToken)
    const Url:any = "http://localhost:3000"
    return (
         <TokenContext.Provider 
            value={{
                accessToken,
                refreshToken
             }}>
               {props.children}
         </TokenContext.Provider>
    )
}
export default TokenContextProvider