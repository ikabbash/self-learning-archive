import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function AddClientModal() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        // to be passed in
        variables: {name, email, phone},
        // re-cache so it appears automatically
        update(cache, { data: {addClient }}) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS});
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] }
                // data: { clients: clients.concat([addClient])},
            });
        }
    });

    // needs a mutation when submitting to the form
    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(name, email, phone);
        if(name === '' || email === '' || phone === '') {
            return alert('Please fill in all the fields');
        }
        addClient(name, email, phone);

        // clear the form
        setName('');
        setEmail('');
        setPhone('');
    };

    return (
        <>
        <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#ClientModal"
        >
            <div className="d-flex align-items-center">
                <FaUser className="icon" />
                <div>Add client</div>
            </div>
        </button>

        <div
            className="modal fade"
            id="ClientModal"
            aria-labelledby="ClientModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5" id="ClientModalLabel">
                    Add Client
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
                            vlaue={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            {/* the value needs to be connected to a piece of state */}
                            <input id="email" type="email" className="form-control"
                            vlaue={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            {/* the value needs to be connected to a piece of state */}
                            <input id="phone" type="text" className="form-control"
                            vlaue={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        {/* data-bs-dismiss="modal" so when it's submitted it closes */}
                        <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">Submit</button>
                    </form>
                
                </div>
            </div>
            </div>
        </div>
        </>
    );
}
