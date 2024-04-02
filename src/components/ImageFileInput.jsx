import imgPlaceholder from '../app-assets/images/placeholder.jpg';

export function ImageFileInput(props) {

    return (
        <span>
            <div className="position-relative" style={{maxWidth: "80px"}}>
                <input className='position-absolute w-100 h-100 fade' type='file' 
                role='button' onChange={e => props.handleFileChange(e.target.files[0])} 
                accept='image/*' style={{top: 0, left: 0}}/>
                <img src={props.img_url !== '' ? props.img_url : imgPlaceholder} 
                className="img-fluid rounded" alt=""/>
            </div>
        </span>
    )
}