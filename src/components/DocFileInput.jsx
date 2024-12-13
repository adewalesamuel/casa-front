import { Download } from 'react-feather';
import { Hooks } from '../hooks';
import { useEffect } from 'react';

export function DocFileInput(props) {
    const useFile = Hooks.useFile('file');

    useEffect(() => {
        if (!useFile.fileUrl) return;
        props.handleDocChange(useFile.fileUrl);
    }, [useFile.fileUrl]);

    return (
        <span>
            <div className="position-relative">
                {props.file_url &&
                    <a href={props.file_url} download={"piece-identite"} 
                    className='btn btn-sm btn-link mb-2'>
                        <Download className='me-2'/> Télécharger
                    </a>
                }
                <input className='form-control' type='file' 
                role='button' onChange={e => useFile.handleFileChange(e.target.files[0])} 
                accept='.pdf, image/*' style={{top: 0, left: 0}}/>
            </div>
        </span>
    )
}