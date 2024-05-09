import * as Icons from 'react-feather';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react';
import { Services } from '../services';

export function MobileHeroSection() {
    let abortController = new AbortController();

    const pathList = ['/mobile'];

    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [searchParams, ] = useSearchParams();

    const [municipality_id, setMunicipality_id] = useState(
        searchParams.get('municipality_id') ?? '');
    const [nom, setNom] = useState(searchParams.get('nom') ?? '');

    const handleSearchSubmit = e => {
        e.preventDefault()
        navigate(`/mobile/publications?page=&municipality_id=${municipality_id}&nom=${nom}`);
    }
    
    useEffect(() => {   
        if (!pathList.includes(pathname)) return;
        
        return () => {
            abortController.abort()
            abortController = new AbortController();
        }
    }, [pathname])

    if (pathname.startsWith('/mobile/publications/'))
        return null;

	return (
            <div className="text-white mt-xl-5 text-center mx-auto">
                {pathList.includes(pathname) && 
                    <form className="form-inline mt-5 justify-content-center pb-4"
                    onSubmit={handleSearchSubmit}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white text-primary 
                                border-0 rounded-md">
                                    <Icons.Search />
                                </span>
                            </div>

                            <input className="bg-white form-control border-0 pl-0 flex-fill 
                            rounded-md" type="search" name="search" 
                            placeholder="Recherchez un studio, appartement, etc..." 
                            value={nom} onChange={e => setNom(e.target.value)}/>
                        </div>
                    </form>        
                }
                {!pathList.includes(pathname) && 
                    <h4 className="text-uppercase text-break mt-5">
                        {pathname.replace('/mobile', '').replace('/',' ')}
                    </h4>
                }
            </div>
		)
}