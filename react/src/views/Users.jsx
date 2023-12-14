import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link, NavLink } from "react-router-dom"

export default function Users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUsers();
    }, [])

    const onDelete = (u) => {
        if (!window.confirm("Are you want to delete this user?")) {
            return
        }

        axiosClient.delete(`/users/${u.id}`)
            .then(() => {
                //TODO show notification
                getUsers()
            })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({data}) => {
                setLoading(false)
                console.log(data);
                setUsers(data.data)
            })

            .catch(() => {
                setLoading(false)
            })
    }

    return(
        <div>
            <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
                <h1>Users</h1>
                <NavLink to={"/users/new"} className="btn-add">Add new</NavLink>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {
                        loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {
                        !loading &&
                        <tbody>
                            {users.map(u =>(
                                <tr>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.create_at}</td>
                                    <td>
                                        <Link className="btn-edit" to={'/users/'+u.id}>Edit</Link>
                                        &nbsp;
                                        <button onClick={ev => onDelete(u)} className="btn-delete">Delete</button>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}
