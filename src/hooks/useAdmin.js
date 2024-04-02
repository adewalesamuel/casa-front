import { useState } from 'react';
import { Services } from '../services';

export const useAdmin = () => {
    const [id, setId] = useState('');
	const [nom, setNom] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [profile_img_url, setProfile_img_url] = useState('');
	const [role_id, setRole_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getAdmin = (adminId, signal) => {        
        return Services.AdminService.getById(adminId, signal)
        .then(response => {
            fillAdmin(response.admin);
            setIsDisabled(false);

            return response;
        });
    }

    const createAdmin = signal => {
        const payload = {
            nom,
		email,
		password,
		profile_img_url,
		role_id,
		
        };

        return Services.AdminService.create(
        JSON.stringify(payload), signal);
    }
    const updateAdmin = (adminId, signal) => {
        const payload = {
            nom,
		email,
		password,
		profile_img_url,
		role_id,
		
        };

        return Services.AdminService.update(
        	adminId, JSON.stringify(payload), signal);
    }
    const deleteAdmin = (adminId, signal) => {
        return Services.AdminService.destroy(adminId, signal);
    }
    const fillAdmin = (admin) => {
        setId(admin.id);
        setNom(admin.nom ?? '');
		setEmail(admin.email ?? '');
		setPassword(admin.password ?? '');
		setProfile_img_url(admin.profile_img_url ?? '');
		setRole_id(admin.role_id ?? '');
		
    }
    const emptyAdmin = () => {
        setId('');
        setNom('');
		setEmail('');
		setPassword('');
		setProfile_img_url('');
		setRole_id('');
		
    }

    return {
        id,
        nom,
		email,
		password,
		profile_img_url,
		role_id,
		
        errors,
        isDisabled,
        setNom,
		setEmail,
		setPassword,
		setProfile_img_url,
		setRole_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getAdmin,
        createAdmin,
        updateAdmin,
        deleteAdmin,
        fillAdmin,
        emptyAdmin
    };
}