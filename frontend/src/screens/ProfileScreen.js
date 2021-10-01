import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo, } = userSignIn;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(() => {
        //!
        if (!user) {
            dispatch(detailsUser(userInfo._id));
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
        }
        else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user]);
    const updateHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and confirm password does not match');
        }
        else {
            dispatch(updateUserProfile({
                userId: userInfo._id,
                name,
                email,
                password
            })
            );
        }
    };

    return (
        <div>
            <form className="form" onSubmit={updateHandler}>
                <div>
                    <h1>My Profile</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && (
                    <MessageBox variant="danger">{errorUpdate}</MessageBox>
                )}
                {successUpdate && <MessageBox variant="success">
                    Profile updated
                                </MessageBox>}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{errorUpdate}</MessageBox>
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
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                onChange={(e) => setConfirmPassword(e.target.value)}>
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