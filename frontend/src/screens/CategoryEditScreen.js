import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsCategory, updateCategory } from '../actions/categoryActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants';

export default function CategoryEditScreen(props){
    const categoryId = props.match.params.id;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const categoryDetails = useSelector((state) => state.categoryDetails);
    const {loading, error, category} = categoryDetails;
    const categoryUpdate = useSelector((state) => state.categoryUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = categoryUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successUpdate){
            props.history.push('/categorylist');
        }
        if (!category || category._id !== categoryId || successUpdate){
            dispatch({type: CATEGORY_UPDATE_RESET});
            dispatch(detailsCategory(categoryId));
        }
        else {
            setName(category.name);
            setDescription(category.description);
        }
    },[dispatch, categoryId, category, props.history, successUpdate]);

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateCategory({
            _id: categoryId,
            name,
            description,
        })
        );
    };
    return (
        <div>
            <Link to='/categorylist'> Back</Link>

            <form className="form" onSubmit={updateHandler}>
                <div>
                    <h1>
                        Category {category.name}
                    </h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant= "danger">{errorUpdate}</MessageBox>}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger"> {error}</MessageBox>
                ): (
                    <>
                        <div>
                            <label htmlFor="name"> Name </label>
                            <input
                            type="text"
                            id="name"
                            placeholder="Enter name"
                            value={name}
                            onChange= {(e) => setName(e.target.value)}>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="description"> Description</label>
                            <input
                            type="text"
                            id="description"
                            placeholder="Enter description"
                            value={description}
                            onChange= {(e) => setDescription(e.target.value)}>
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