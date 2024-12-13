import placeholderImg from '../assets/img/placeholder.webp';
import { Hooks } from '../hooks';
import { useEffect } from 'react';

export function ImageFileInput(props) {
    const useFile = Hooks.useFile();

    useEffect(() => {
        if (!useFile.fileUrl) return;
        props.handleImageChange(useFile.fileUrl);
    }, [useFile.fileUrl]);

    return (
        <span>
            <div className="position-relative" style={{maxWidth: "100px"}}>
                <input className='position-absolute w-100 h-100 fade' type='file' 
                role='button' onChange={e => useFile.handleFileChange(e.target.files[0])} 
                accept='image/*' style={{top: 0, left: 0}}/>
                <img src={props.img_url ?? ''} className="img-fluid rounded" 
                alt="" onError={e => e.currentTarget.src = placeholderImg}/>
            </div>
        </span>
    )
}