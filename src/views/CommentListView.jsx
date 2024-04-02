//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function CommentListView() {
    let abortController = new AbortController();

    const { CommentService } = Services;

    const tableAttributes = {
        'description': {},
		'score': {},
		'product_id': {},
		'user_id': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [comments, setComments] = useState([]);
    const [page, ] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/comments/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, comment) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce comment')) {
            const commentsCopy = [...comments];
            const index = commentsCopy.findIndex(commentItem => 
                commentItem.id === comment.id);

            commentsCopy.splice(index, 1);
            setComments(commentsCopy);

            await CommentService.destroy(comment.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {comments} = await CommentService.getAll(
                {page: page}, abortController.signal);

            setComments(comments.data);
            setPageLength(comments.last_page);
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
            <h6>Liste Comments</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/comments/create'>
                    <i className='icon ion-plus'></i> Créer comment
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={comments}/>
            </Components.Loader>
        </>
    )
}
