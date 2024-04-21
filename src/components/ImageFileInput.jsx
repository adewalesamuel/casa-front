import placeholderImg from '../assets/img/placeholder.webp';;
import { Services } from '../services';

export function ImageFileInput(props) {

    const handleFileChange = async file => {
        try {
            const formData = new FormData();

            formData.append('image', file);

            const {image_url} = await Services.FileService.store(formData);

            props.setImg_url(image_url);
        } catch(error) {
            if ('message' in error) alert(error.message);
        }
    }

    return (
        <span>
            <div className="position-relative" style={{maxWidth: "100px"}}>
                <input className='position-absolute w-100 h-100 fade' type='file' 
                role='button' onChange={e => handleFileChange(e.target.files[0])} 
                accept='image/*' style={{top: 0, left: 0}}/>
                <img src={props.img_url ?? ''} className="img-fluid rounded" 
                alt="" onError={e => e.currentTarget.src = placeholderImg}/>
            </div>
        </span>
    )
}