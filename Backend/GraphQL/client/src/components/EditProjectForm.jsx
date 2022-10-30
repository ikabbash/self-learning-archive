// for our fields
import { useState } from 'react';
import { useMutation } from '@apollo/client';
// will be called after we update
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';

export default function EditProjectForm({ project }) {
    // state values for values like name, description and status
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState('');

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status},
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id}}]
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if( !name || !description || !status) {
            return alert('Please fill out all fields');
        }

        updateProject(name, description, status);
    };

    return (
    <div className='mt-5'>
        <h3>Update Project Details</h3>
        <form onSubmit={ onSubmit }>
        <div className="mb-3">
            <label className="form-label">Name</label>
            {/* the value needs to be connected to a piece of state */}
            <input id="name" type="text" className="form-control"
            value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
            <label className="form-label">Description</label>
            {/* the value needs to be connected to a piece of state */}
            <textarea id="description" type="email" className="form-control"
            value={description} onChange={(e) => setDescription(e.target.value)}>
            </textarea>
        </div>
        <div className="mb-3">
            <label className="form-label">Status</label>
            <select id="status" className="form-select"
            value={status} onChange={ (e) => setStatus(e.target.value)}>
                <option value="new">Not Started</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
        </div>

        <button type='submit' className="btn btn-primary">Submit</button>
        </form>
    </div>
    )
}
