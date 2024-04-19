import { useState } from "react";
import { Components } from "../components";
import { Layouts } from "../layouts";

import logo from '../assets/logo.jpeg';
import { Link, useNavigate } from "react-router-dom";
import { Services } from "../services";
import { Utils } from "../utils";

export function LoginView() {
    const abortController = new AbortController();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    const [errorMessages, setErrorMessages] = useState([]);

    const handleLoginSubmit = async e => {
        e.preventDefault();
        setIsDisabled(true);
        setErrorMessages([]);

        try {
            const payload = {email, password}

            const {user, token} = await Services.AuthService.login(
                JSON.stringify(payload), abortController.signal
            );

            Utils.Auth.setSessionToken(token)
            Utils.Auth.setUser(user);

            navigate('/');
        } catch (error) {
            if ('messages' in error) setErrorMessages(await error.messages);
            if ('message' in error) setErrorMessages([error.message])
        }finally {
            setIsDisabled(false)
        }
    }

    return (
        <Layouts.AuthLayout>
            <div style={{maxWidth: "400px"}}>
                <div className="card px-2 pt-5 pb-2">
                    <div className="text-center">
                        <img src={logo} alt="logo" width={100} height={100} />
                    </div>
                    <div className="card-body">
                        <Components.ErrorMessages>
                            {errorMessages}
                        </Components.ErrorMessages>
                        <Components.LoginForm email={email} setEmail={setEmail}
                        password={password} setPassword={setPassword} isDisabled={isDisabled}
                        handleFormSubmit={handleLoginSubmit}/>

                    <div className="d-flex justify-content-between mt-3 align-items-center">
                        <small className="">Vous n&apos;avez pas de compte ?</small>
                        <Link to={'/inscription'} className="text-primary">
                            <small>Inscrivez-vous</small>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        </Layouts.AuthLayout>
    )    
}