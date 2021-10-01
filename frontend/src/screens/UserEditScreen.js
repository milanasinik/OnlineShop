import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_EDIT_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
    const userId = props.match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState('');

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userEdit = useSelector((state) => state.userEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit
    } = userEdit;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successEdit){
            props.history.push('/userlist');
        }
        if (!user || user._id !== userId || successEdit) {
            dispatch({type: USER_EDIT_RESET});
            dispatch(detailsUser(userId));
        }
        else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }

    }, [dispatch, userId, user, successEdit, props.history]);

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUser({
                _id: userId,
                name,
                email,
                isAdmin,
            })
        );
        props.history.push('/userlist');
    };
    return (
        <div>
            <Link to='/userlist'>Back</Link>

            <form className="form" onSubmit={updateHandler}>
                <div>
                    <h1>User {userId}</h1>
                </div>
                {loadingEdit && <LoadingBox></LoadingBox>}
                {errorEdit && <MessageBox variant="danger"> {errorEdit}</MessageBox>}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="isAdmin">is Admin</label>
                            <input
                                type="text"
                                id="isAdmin"
                                placeholder="Enter isAdmin"
                                value={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.value)}>
                            </input>
                        </div>
                        <div>
                            <label></label>
                            <button className="primary" type="submit">
                                Update
                                    </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}