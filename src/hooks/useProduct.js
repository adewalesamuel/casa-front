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
	const [municipality, setMunicipality] = useState({});
	const [category, setCategory] = useState({});
	const [features, setFeatures] = useState([]);
	const [created_at, setCreated_at] = useState('');
	const [user, setUser] = useState({});

    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getProduct = (slug, signal) => {        
        return Services.ProductService.getBySlug(slug, signal)
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
		setDisplay_img_url_list(product.display_img_url_list ?? '');
		setImages_url_list(product.images_url_list ?? '');
		setCategory_id(product.category_id ?? '');
		setMunicipality_id(product.municipality_id ?? '');
		setUser_id(product.user_id ?? '');
		setCreated_at(product.created_at ?? '');

		setCategory(product.category ?? {});
		setMunicipality(product.municipality ?? {});
		setFeatures(product.features ?? []);
		setUser(product.user ?? {});
		
    }
    const emptyProduct = () => {
        setId('');
        setNom('');
		setSlug('');
		setDescription('');
		setPrix('');
		setType_paiement('');
		setType('');
		setDisplay_img_url_list('');
		setImages_url_list('');
		setCategory_id('');
		setMunicipality_id('');
		setUser_id('');
		setCreated_at('');

		setCategory({});
		setMunicipality({});
		setFeatures([]);
		setUser({});
		
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
		created_at,

		municipality,
		category,
		features,
		user,

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
		
        setId,
        setErrors,
        setIsDisabled,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        fillProduct,
        emptyProduct,
    };
}