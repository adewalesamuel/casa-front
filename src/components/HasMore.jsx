import { Components } from "../components";
import * as Icons from 'react-feather';

export function HasMore({isLoading, setPage, page, hasMore}) {
    return (
        <div className='text-center py-5'>
        {isLoading && <Components.Spinner />}
        {(!isLoading && hasMore) &&
            <button className='btn btn-info btn-sm' onClick={() => setPage(page + 1)}>
                <Icons.PlusCircle /> Charger plus
            </button>
        }
    </div>
    )
}