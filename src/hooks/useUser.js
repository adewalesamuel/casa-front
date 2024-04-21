import { useState } from 'react';
import { Services } from '../services';

export const useUser = () => {
    const [id, setId] = useState('');
	const [nom, setNom] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password_confirmation, setPassword_confirmation] = useState('');
	const [profile_img_url, setProfile_img_url] = useState('');
	const [genre, setGenre] = useState('');
	const [adresse, setAdresse] = useState('');
	const [numero_telephone, setNumero_telephone] = useState('');
	const [numero_whatsapp, setNumero_whatsapp] = useState('');
	const [numero_telegram, setNumero_telegram] = useState('');
	const [company_name, setCompany_name] = useState('');
	const [company_logo_url, setCompany_logo_url] = useState('');
	const [type, setType] = useState('');
	const [api_token, setApi_token] = useState('');
	const [is_active, setIs_active] = useState('');
	const [is_company, setIs_company] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getUser = (userId, signal) => {        
        return Services.UserService.getById(userId, signal)
        .then(response => {
            fillUser(response.user);
            setIsDisabled(false);

            return response;
        });
    }

    const createUser = signal => {
        const payload = {
            nom,
		email,
		password,
		password_confirmation,
		profile_img_url,
		genre,
		adresse,
		numero_telephone,
		numero_whatsapp,
		numero_telegram,
		company_name,
		company_logo_url,
		type,
		api_token,
		is_active,
		is_company,
		
        };

        return Services.UserService.create(
        JSON.stringify(payload), signal);
    }
    const updateUser = (signal) => {
        const payload = {
            nom,
		email,
		password,
		profile_img_url,
		genre,
		adresse,
		numero_telephone,
		numero_whatsapp,
		numero_telegram,
		company_name,
		company_logo_url,
		type,
		api_token,
		is_active,
		is_company,
		
        };

        return Services.UserService.update(JSON.stringify(payload), signal);
    }
    const deleteUser = (userId, signal) => {
        return Services.UserService.destroy(userId, signal);
    }
    const fillUser = (user) => {
        setId(user.id);
        setNom(user.nom ?? '');
		setEmail(user.email ?? '');
		setPassword(user.password ?? '');
		setProfile_img_url(user.profile_img_url ?? '');
		setGenre(user.genre ?? '');
		setAdresse(user.adresse ?? '');
		setNumero_telephone(user.numero_telephone ?? '');
		setNumero_whatsapp(user.numero_whatsapp ?? '');
		setNumero_telegram(user.numero_telegram ?? '');
		setCompany_name(user.company_name ?? '');
		setCompany_logo_url(user.company_logo_url ?? '');
		setType(user.type ?? '');
		setApi_token(user.api_token ?? '');
		setIs_active(user.is_active ?? '');
		setIs_company(user.is_company ?? '');
		
    }
    const emptyUser = () => {
        setId('');
        setNom('');
		setEmail('');
		setPassword('');
		setPassword_confirmation('');
		setProfile_img_url('');
		setGenre('');
		setAdresse('');
		setNumero_telephone('');
		setNumero_whatsapp('');
		setNumero_telegram('');
		setCompany_name('');
		setCompany_logo_url('');
		setType('');
		setApi_token('');
		setIs_active('');
		setIs_company('');
		
    }

    return {
        id,
        nom,
		email,
		password,
		password_confirmation,
		profile_img_url,
		genre,
		adresse,
		numero_telephone,
		numero_whatsapp,
		numero_telegram,
		company_name,
		company_logo_url,
		type,
		api_token,
		is_active,
		is_company,
		
        errors,
        isDisabled,
        setNom,
		setEmail,
		setPassword,
		setPassword_confirmation,
		setProfile_img_url,
		setGenre,
		setAdresse,
		setNumero_telephone,
		setNumero_whatsapp,
		setNumero_telegram,
		setCompany_name,
		setCompany_logo_url,
		setType,
		setApi_token,
		setIs_active,
		setIs_company,
		
        setId,
        setErrors,
        setIsDisabled,
        getUser,
        createUser,
        updateUser,
        deleteUser,
        fillUser,
        emptyUser
    };
}