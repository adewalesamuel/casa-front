//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function PromoCodeListView() {
    let abortController = new AbortController();

    const { PromoCodeService } = Services;

    const tableAttributes = {
        'code': {},
		'expiration_date': {},
		'type': {},
		'user_id': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [promo_codes, setPromoCodes] = useState([]);
    const [page, ] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/promo-codes/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, promo_code) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce promo_code')) {
            const promo_codesCopy = [...promo_codes];
            const index = promo_codesCopy.findIndex(promo_codeItem => 
                promo_codeItem.id === promo_code.id);

            promo_codesCopy.splice(index, 1);
            setPromoCodes(promo_codesCopy);

            await PromoCodeService.destroy(promo_code.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {promo_codes} = await PromoCodeService.getAll(
                {page: page}, abortController.signal);

            setPromoCodes(promo_codes.data);
            setPageLength(promo_codes.last_page);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        init();

        return () => {
            abortController.abort();
            abortController = new AbortController();
        }
    }, [init])

    return (
        <>
            <h6>Liste PromoCodes</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/promo-codes/create'>
                    <i className='icon ion-plus'></i> Créer promo_code
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={promo_codes}/>
            </Components.Loader>
        </>
    )
}
