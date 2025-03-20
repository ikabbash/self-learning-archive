import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
// to update cache
import { GET_PROJECTS } from '../queries/projectQueries';
// to delete project
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { useMutation } from '@apollo/client';

export default function DeleteProjectButton({ projectId }) {
    // to redirect user once project is deleted
    const navigate = useNavigate();
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        // navigate to home page
        onCompleted: () => navigate('/'),
        // instead of updating cache
        refetchQueries: [{ query: GET_PROJECTS }],
    })

    return (
    <div className='d-flex mt-5 ms-auto'>
        <button className="btn btn-danger m-2" onClick={deleteProject}>
            <FaTrash className="icon" /> Delete Project
        </button>
    </div>
    )
}
