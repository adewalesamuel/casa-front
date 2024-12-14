import { useState } from "react";
import { Components } from "../components";
import { Layouts } from "../layouts";

import logo from '../assets/img/logo.jpeg';
import { Link, useNavigate } from "react-router-dom";
import { Hooks } from "../hooks";
import { Services } from "../services";
import { Utils } from "../utils";
import { CONSTS } from "../constants";

export function RegisterView() {
    const abortController = new AbortController();

    const navigate = useNavigate();
    const useUser = Hooks.useUser();

    const [errorMessages, setErrorMessages] = useState([]);

    const handleRegisterSubmit = async e => {
        e.preventDefault();
        useUser.setIsDisabled(true);
        setErrorMessages([]);

        try {
            const payload = {
                nom: useUser.nom,
                numero_telephone: useUser.numero_telephone,
                type: useUser.type,
                email: useUser.email,
                password: useUser.password,
                password_confirmation: useUser.password_confirmation,
            }

            const {user, token} = await Services.AuthService.register(
                JSON.stringify(payload), abortController.signal
            );

            Utils.Auth.setSessionToken(token)
            Utils.Auth.setUser(user);

            const nextRoute = useUser.type === CONSTS.USER.TYPES.VENDEUR ? 
            '/mon-profil/mon-compte' : '/';

            navigate(nextRoute);
        } catch (error) {
            if ('messages' in error) setErrorMessages(await error.messages);
            if ('message' in error) setErrorMessages([error.message])
        }finally {
            useUser.setIsDisabled(false)
        }
    }

    return (
        <Layouts.AuthLayout>
            <div style={{maxWidth: "400px"}}>
                <div className="card px-2 pt-5 pb-2">
                    <div className="text-center">
                        <img src={logo} alt="logo img-fluid" width={100} />
                    </div>
                    <div className="card-body">
                        <Components.ErrorMessages>
                            {errorMessages}
                        </Components.ErrorMessages>
                        <Components.RegisterForm useUser={useUser} isDisabled={useUser.isDisabled}
                        handleFormSubmit={handleRegisterSubmit}/>

                    <div className="d-flex justify-content-between mt-3 align-items-center">
                        <small className="">Vous avez déjà un compte ?</small>
                        <Link to={'/connexion'} className="text-primary">
                            <small>Connectez-vous</small>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        </Layouts.AuthLayout>
    )    
}