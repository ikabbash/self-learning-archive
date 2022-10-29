// GraphQL Queries
// gql makes the query, but to use the query and get the data
// in our component then have to use the useQuery hook
import { useQuery } from '@apollo/client';
import ClientRow from './ClientRow';
// queries
import { GET_CLIENTS } from '../queries/clientQueries';
import Spinner from './Spinner';


// DISPLAY ALL CLIENTS
export default function Clients() {
    // loading state is whether true or false
    const { loading, error, data } = useQuery(GET_CLIENTS)
    if (loading) return <Spinner />
    if (error) return <p>Something went wrong</p>
    return (
    <>
    {/* if no error and not loading, then */}
        {!loading && !error && (
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* .map passes through each client then displays them */}
                    {data.clients.map(client => (
                        // client will be passed as prop in client=client
                        <ClientRow key={client.id} client={client} />
                    ))}
                </tbody>
            </table>
        )}
    </>
  )
}
