import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { searchProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import { prices, ratings } from '../utils';
import Rating from '../components/Rating';
import { listCategories } from '../actions/categoryActions';

export default function SearchScreen(props) {
    const {
        name = 'all',
        category = 'all',
        order= 'newest',
        min = 0,
        max = 0,
        rating = 0,
        
    } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    /*const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories
    } = productCategoryList;*/
    const categoryList = useSelector((state) => state.categoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories
    } = categoryList;

    useEffect(() => {
        dispatch(searchProducts({
            name: name !== 'all' ? name : '',
            category: category !== 'all' ? category : '',
            order,
            min,
            max,
            rating,
        }));
        
            dispatch(listCategories());
        
    }, [dispatch, name, category, min, max, rating, order]);

    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
    };
    return (
        <div>
            <div className="row top">
                    {loading ? (<LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <div>{products.length} Results</div>
                    )}
                    <div>
                        Sort by{' '}
                        <select
                            value={order}
                            onChange={(e) => {
                                props.history.push(getFilterUrl({order: e.target.value}));
                            }}
                            >
                                <option value="newest">Newest arrivals</option>
                                <option value="lowest">Price: Low to High</option>
                                <option value="highest">Price: High to Low</option>
                                <option value="toprated">Average rating</option>
                        </select>
                    </div>
                    </div>
                    <div className="row top">
                        <div className="col-1">
                            <h3>Categories</h3>
                            <div>
                                {loadingCategories ? (
                                    <LoadingBox></LoadingBox>
                                ) : errorCategories ? (
                                    <MessageBox variant="danger">{errorCategories}</MessageBox>
                                ) : (
                                    <ul>
                                        <li>
                                            <Link
                                                className={'all' === category ? 'active' : ''}
                                                to={getFilterUrl({ category: 'all' })}
                                            >Any
                                            </Link>
                                        </li>
                                        {categories.map((c) => (
                                            <li key={c._id}>
                                                <Link
                                                    className={c._id === category ? 'active' : ''}
                                                    to={getFilterUrl({ category: c._id })}
                                                >{c.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <h3>Price</h3>
                                <ul>
                                    {prices.map((p) => (
                                        <li key={p.name}>
                                            <Link
                                                to={getFilterUrl({ min: p.min, max: p.max })}
                                                className={
                                                    `${p.min}-${p.max}` === `${min} - ${max}` ? 'active' : ''
                                                }>
                                                {p.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3>Rating</h3>
                                <ul>
                                
                                    {ratings.map((r) => (
                                        <li key={r.name}>
                                            <Link
                                                to={getFilterUrl({ rating: r.rating })}
                                                className={
                                                    `${r.rating}` === rating ? 'active' : ''
                                                }>

                                                <Rating caption={' & up'} rating={r.rating}></Rating>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-2">
                            {loading ? (<LoadingBox></LoadingBox>
                            ) : error ? (
                                <MessageBox variant="danger">{error}</MessageBox>
                            ) : (
                                <>
                                {products.length === 0 && (
                                    <MessageBox>No product found</MessageBox>
                                )}
                                    <div className="row center">
                                        {
                                            products.map((product) => (
                                                <Product key={product._id} product={product}></Product>
                                            ))
                                        }
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                
            </div>
        
    );
}