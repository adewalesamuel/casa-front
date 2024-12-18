import { Navigate, useLocation } from "react-router-dom";
import { Utils } from "../utils";
import { useState } from "react";

export function PrivateView(props) {
    const {pathname} = useLocation();
	const [isMobile,] = useState(pathname.startsWith('/mobile'));
    return (
        !Utils.Auth.isLoggedIn() ? 
        <Navigate replace to={`${isMobile ? '/mobile/connexion': '/connexion'}`} /> : 
        <props.View {...props} />
    )
}