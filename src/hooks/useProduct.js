import { useState } from 'react';
import { Services } from '../services';

export const useProduct = () => {
    const [id, setId] = useState('');
	const [nom, setNom] = useState('');
	const [slug, setSlug] = useState('');
	const [description, setDescription] = useState('');
	const [prix, setPrix] = useState('');
	const [type_paiement, setType_paiement] = useState('');
	const [type, setType] = useState('');
	const [display_img_url_list, setDisplay_img_url_list] = useState([]);
	const [images_url_list, setImages_url_list] = useState([]);
	const [category_id, setCategory_id] = useState('');
	const [municipality_id, setMunicipality_id] = useState('');
	const [user_id, setUser_id] = useState('');
	const [created_at, setCreated_at] = useState('');

	const [features, setFeatures] = useState([]);
	const [user, setUser] = useState({});
	const [category, setCategory] = useState({});
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleImageChange = (display_img_url, img_url) => {
		const display_img_url_listCopy = [...display_img_url_list];
		const images_url_listCopy = [...display_img_url_list];

		display_img_url_listCopy.push(display_img_url);
		images_url_listCopy.push(img_url);

		setDisplay_img_url_list(display_img_url_listCopy);
		setImages_url_list(images_url_listCopy);
    }

    const getProduct = (productId, signal) => {        
        return Services.ProductService.getBySlug(productId, signal)
        .then(response => {
            fillProduct(response.product);
            setIsDisabled(false);

            return response;
        });
    }

    const createProduct = signal => {
        const payload = {
            nom,
		slug,
		description,
		prix,
		type_paiement,
		type,
		display_img_url_list,
		images_url_list,
		category_id,
		municipality_id,
		user_id,
		
        };

        return Services.ProductService.create(
        JSON.stringify(payload), signal);
    }
    const updateProduct = (productId, signal) => {
        const payload = {
            nom,
		slug,
		description,
		prix,
		type_paiement,
		type,
		display_img_url_list,
		images_url_list,
		category_id,
		municipality_id,
		user_id,
		
        };

        return Services.ProductService.update(
        	productId, JSON.stringify(payload), signal);
    }
    const deleteProduct = (productId, signal) => {
        return Services.ProductService.destroy(productId, signal);
    }
    const fillProduct = (product) => {
        setId(product.id);
        setNom(product.nom ?? '');
		setSlug(product.slug ?? '');
		setDescription(product.description ?? '');
		setPrix(product.prix ?? '');
		setType_paiement(product.type_paiement ?? '');
		setType(product.type ?? '');
		setDisplay_img_url_list(product.display_img_url_list ?? []);
		setImages_url_list(product.images_url_list ?? []);
		setCategory_id(product.category_id ?? '');
		setMunicipality_id(product.municipality_id ?? '');
		setUser_id(product.user_id ?? '');
		setCreated_at(product.created_at ?? '');
		
		setFeatures(product.features ?? []);
		setUser(product.user ?? {});
		setCategory(product.category ?? {});
		
    }
    const emptyProduct = () => {
        setId('');
        setNom('');
		setSlug('');
		setDescription('');
		setPrix('');
		setType_paiement('');
		setType('');
		setDisplay_img_url_list([]);
		setImages_url_list([]);
		setCategory_id('');
		setMunicipality_id('');
		setUser_id('');
		setCreated_at('');

		setFeatures([]);
		setUser({});
		setCategory({});
    }

    return {
        id,
        nom,
		slug,
		description,
		prix,
		type_paiement,
		type,
		display_img_url_list,
		images_url_list,
		category_id,
		municipality_id,
		user_id,
		features,
		user,
		category,
		created_at,
		
        errors,
        isDisabled,
        setNom,
		setSlug,
		setDescription,
		setPrix,
		setType_paiement,
		setType,
		setDisplay_img_url_list,
		setImages_url_list,
		setCategory_id,
		setMunicipality_id,
		setUser_id,
		setFeatures,
		setUser,
		setCategory,
		setCreated_at,
		
        setId,
        setErrors,
        setIsDisabled,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        fillProduct,
        emptyProduct,

        handleImageChange
    };
}