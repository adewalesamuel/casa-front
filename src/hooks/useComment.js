import { useState } from 'react';
import { Services } from '../services';

export const useComment = () => {
    const [id, setId] = useState('');
	const [description, setDescription] = useState('');
	const [score, setScore] = useState('');
	const [product_id, setProduct_id] = useState('');
	const [user_id, setUser_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getComment = (commentId, signal) => {        
        return Services.CommentService.getById(commentId, signal)
        .then(response => {
            fillComment(response.comment);
            setIsDisabled(false);

            return response;
        });
    }

    const createComment = signal => {
        const payload = {
            description,
		score,
		product_id,
		user_id,
		
        };

        return Services.CommentService.create(
        JSON.stringify(payload), signal);
    }
    const updateComment = (commentId, signal) => {
        const payload = {
            description,
		score,
		product_id,
		user_id,
		
        };

        return Services.CommentService.update(
        	commentId, JSON.stringify(payload), signal);
    }
    const deleteComment = (commentId, signal) => {
        return Services.CommentService.destroy(commentId, signal);
    }
    const fillComment = (comment) => {
        setId(comment.id);
        setDescription(comment.description ?? '');
		setScore(comment.score ?? '');
		setProduct_id(comment.product_id ?? '');
		setUser_id(comment.user_id ?? '');
		
    }
    const emptyComment = () => {
        setId('');
        setDescription('');
		setScore('');
		setProduct_id('');
		setUser_id('');
		
    }

    return {
        id,
        description,
		score,
		product_id,
		user_id,
		
        errors,
        isDisabled,
        setDescription,
		setScore,
		setProduct_id,
		setUser_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getComment,
        createComment,
        updateComment,
        deleteComment,
        fillComment,
        emptyComment
    };
}