 import React, { useEffect } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { Link, useParams } from 'react-router-dom';
 import LoadingBox from '../components/LoadingBox';
 import MessageBox from '../components/MessageBox';
 import Doctor from '../components/Doctor';
 import { listDoctors } from '../actions/doctorActions';

 export default function SearchScreen(props) {
   const { name = 'all', category = 'all' } = useParams();
   const dispatch = useDispatch();
   const doctorList = useSelector((state) => state.doctorList);
   const { loading, error, doctors } = doctorList;

   const doctorCategoryList = useSelector((state) => state.doctorCategoryList);
   const {
     loading: loadingCategories,
     error: errorCategories,
     categories,
   } = doctorCategoryList;

   useEffect(() => {
     dispatch(
       listDoctors({
         name: name !== 'all' ? name : '',
         category: category !== 'all' ? category : '',
       })
     );
   }, [category, dispatch, name]);

   const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    return `/search/category/${filterCategory}/name/${filterName}`;
  };

   return (
     <div>
       <div className="row">
         {loading ? (
           <LoadingBox></LoadingBox>
         ) : error ? (
           <MessageBox variant="danger">{error}</MessageBox>
         ) : (
           <div>{doctors.length} Results</div>
         )}
       </div>
       <div className="row top">
         <div className="col-1">
           <h3>Department</h3>
           {loadingCategories ? (
             <LoadingBox></LoadingBox>
           ) : errorCategories ? (
             <MessageBox variant="danger">{errorCategories}</MessageBox>
           ) : (
             <ul>
               {categories.map((c) => (
                 <li key={c}>
                   <Link
                     className={c === category ? 'active' : ''}
                     to={getFilterUrl({ category: c })}
                   >
                     {c}
                   </Link>
                 </li>
               ))}
             </ul>
           )}
         </div>
         <div className="col-3">
           {loading ? (
             <LoadingBox></LoadingBox>
           ) : error ? (
             <MessageBox variant="danger">{error}</MessageBox>
           ) : (
             <>
               {doctors.length === 0 && (
                 <MessageBox>No Doctor Details Found</MessageBox>
               )}
               <div className="row center">
                 {doctors.map((doctor) => (
                   <Doctor key={doctor._id} doctor={doctor}></Doctor>
                 ))}
               </div>
             </>
           )}
         </div>
       </div>
     </div>
   );
                 }