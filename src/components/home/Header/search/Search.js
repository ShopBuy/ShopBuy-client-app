// import {useLocation} from "react-router-dom";
// import React, {useEffect, useState} from "react";
// import productApi from "../../../../api/productApi/exprotProductApi"
// import useDebounce from "../../../../hook/useDebounce";
//
// function Search(){
//     const { search } = useLocation();
//     const params = new URLSearchParams(search);
//     const qValue = params.get('q');
//
//     const [searchValue, setSearchValue] = useState('');
//
//     const [product, setProduct] = useState([]);
//
//
//     const debouncedValue = useDebounce(searchValue, 500);
//
//     useEffect(() => {
//         setSearchValue(qValue || '');
//     }, [qValue]);
//
//     useEffect(() => {
//         if (!debouncedValue.trim())
//             return;
//
//         const findMovies = async () => {
//             const data = await productApi.findMoviesByName(debouncedValue);
//             if (data?.data === null)
//                 setProduct([])
//             setProduct(data?.data);
//         };
//
//         findMovies();
//     }, [debouncedValue]);
//
//     return (
//         <div className="main-content" >
//             {product && product.length > 4 ? <FilmSwiper flims={product} name={"Product"} /> : <ShowMovieList movieList={product} type={"search"} />}
//         </div>
//     )
// }
//
// export default Search;