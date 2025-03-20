import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
// GET_CLIENTS query is needed to display all clients to choose for project
import { GET_CLIENTS } from "../queries/clientQueries";
// add single project
import { ADD_PROJECT } from  "../mutations/projectMutations";

export default function AddClientModal() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [status, setStatus] = useState('new');

    // add single project query
    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        // cache so it can display automatically on the client
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: projects.concat([addProject]) },
            });
        }
    });

    // Get clients for select
    const { loading, error, data } = useQuery(GET_CLIENTS);

    // needs a mutation when submitting to the form
    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(name, email, phone);
        if(name === '' || description === '' || status === '') {
            return alert('Please fill in all the fields');
        }

        // add project in the onSubmit button
        addProject(name, description, clientId, status);

        // clear the form
        setName('');
        setDescription('');
        setStatus('new');
        setClientId('');
    };

    // if clients aren't displayed
    if(loading) return null;
    if(error) return 'Something went wrong';

    return (
    <>
        { !loading && !error && (
        <>
            <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
        >
            <div className="d-flex align-items-center">
                <FaList className="icon" />
                <div>New Project</div>
            </div>
        </button>

        <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5" id="addProjectModalLabel">
                    New Project
                </h1>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
                </div>
                <div className="modal-body">

                    <form onSubmit={onSubmit}>
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
                            {/* data of the clients */}
                            <div className="mb-3">
                                <label className="form-label">Client</label>
                                <select id="clientId" className="form-select"
                                value={clientId} onChange={(e) => setClientId(e.target.value)}>
                                    {/* an empty option */}
                                    <option value="">Select Client</option>
                                    {/* the lines below generates options for how many clients exist */}
                                    { data.clients.map((client) => (
                                        <option key={client.id} value={client.id}>
                                            { client.name }
                                        </option>
                                    ))}
                                </select>
                            </div>
                        {/* data-bs-dismiss="modal" so when it's submitted it closes */}
                        <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
                    </form>
                
                </div>
            </div>
            </div>
        </div>
    </>

        )}
        </>
    );
}