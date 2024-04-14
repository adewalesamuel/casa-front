import * as Icons from 'react-feather';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

export function HeroSection() {

    const {pathname} = useLocation();

	return (
	        <div className="text-white mt-xl-5 py-5 text-center mx-auto">
                {pathname === '/' && 
                     <>
                        <h1 className="">Trouvez vore futur propriété</h1>
                        <p>Recherchez parmis des centaines de maisons à acheter ou à louer</p>
                        <form className="form-inline mt-5 justify-content-center pb-4">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white text-primary border-0">
                                        <Icons.Search />
                                    </span>
                                </div>
                                <input className="bg-white form-control border-0 pl-0" type="search" 
                                    name="search" placeholder="Recherchez..."/>
                            </div>
                            <select className="rounded custom-select ml-3 px-4 pr-5">
                                <option hidden>Choisissez le lieu</option>
                                <option>Abidjan</option>
                                <option>Bouaké</option>
                                <option>Villa</option>
                            </select>
                            <button className="btn bg-white rounded-circle p-2 ml-3">
                                <Icons.Search />
                            </button>
                        </form>        
                     </>
                }
                {pathname !== '/' && 
                    <h3 className="text-uppercase text-break">{pathname.replace('/',' ')}</h3>
                }
            </div>
		)
}