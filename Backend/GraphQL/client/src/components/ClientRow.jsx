import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
// probs
export default function ClientRow({ client }) {
  
  // note to self: for buttons to be able to use functions
  // have to put them in square brackets like an array
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries: [{ query: GET_CLIENTS }] but not recommended, slows app
    
    // update function that passes in cache then sets data to
    // the response of the deleteClient (which returns id, name, emial and phone)
    update(cache, {data: { deleteClient}}) { 
      // will get the query from the cache instead of making whole new request
      const { clients } = cache.readQuery({ query: GET_CLIENTS});
      cache.writeQuery({
        query: GET_CLIENTS,
        // filter to the ID of what we wanted to delete
        data: { clients: clients.filter(client => client.id !== deleteClient.id )},
      });
    }
  });

  return (
    <tr>
        <td>{ client.name }</td>
        <td>{ client.email }</td>
        <td>{ client.phone }</td>
        <td><button className="btn btn-danger btn-sm"
        onClick={deleteClient}>
            <FaTrash /></button></td>
    </tr>
  )
}
