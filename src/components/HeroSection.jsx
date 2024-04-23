import * as Icons from 'react-feather';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react';
import { Services } from '../services';

export function HeroSection() {
    let abortController = new AbortController();

    const pathList = ['/', '/publications'];

    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [searchParams, ] = useSearchParams();

    const [cities, setCities] = useState([]);
    const [municipality_id, setMunicipality_id] = useState(
        searchParams.get('municipality_id') ?? '');
    const [nom, setNom] = useState(searchParams.get('nom') ?? '');

    const handleSearchSubmit = e => {
        e.preventDefault()
        navigate(`/publications?page=&municipality_id=${municipality_id}&nom=${nom}`);
    }

    const init = useCallback(async () => {
        try {
            const {cities} = await Services.CityService.getAll(
                {page: ''}, abortController.signal
            ) 

            setCities(cities);
        } catch (error) {
            console.log(error)
        }
    }, [])
    
    useEffect(() => {   
        if (!pathList.includes(pathname)) return;
        if (cities.length > 0) return;

        init();
        
        return () => {
            abortController.abort()
            abortController = new AbortController();
        }
    }, [pathname, cities.length])

	return (
            <div className="text-white mt-xl-5 py-5 text-center mx-auto">
                {pathList.includes(pathname) && 
                        <>
                        <h1 className="">Trouvez vore futur propriété</h1>
                        <p>Recherchez parmis des centaines de maisons à acheter ou à louer</p>
                        <form className="form-inline mt-5 justify-content-center pb-4"
                        onSubmit={handleSearchSubmit}>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white text-primary border-0">
                                        <Icons.Search />
                                    </span>
                                </div>
                                <input className="bg-white form-control border-0 pl-0" type="search" 
                                    name="search" placeholder="Recherchez..." value={nom} 
                                    onChange={e => setNom(e.target.value)}/>
                            </div>
                            <select className="rounded custom-select ml-3 px-4 pr-5"
                            onChange={e => setMunicipality_id(e.target.value)} value={municipality_id}>
                                <option hidden>Choisissez le lieu</option>
                                <option value=''>Toutes les villes</option>
                                {cities.map((city, index) => {
                                    return (
                                        <optgroup key={index} label={city.nom}>
                                            {city?.municipalities.map((municipality, jndex) => {
                                                return (
                                                    <option key={jndex} value={municipality.id}>
                                                        {municipality.nom}
                                                    </option>
                                                )
                                            })}
                                        </optgroup>
                                    )
                                })}
                            </select>
                            <button className="btn bg-white rounded-circle p-2 ml-3" type='submit'>
                                <Icons.Search />
                            </button>
                        </form>        
                        </>
                }
                {!pathList.includes(pathname) && 
                    <h3 className="text-uppercase text-break">{pathname.replace('/',' ')}</h3>
                }
            </div>
		)
}