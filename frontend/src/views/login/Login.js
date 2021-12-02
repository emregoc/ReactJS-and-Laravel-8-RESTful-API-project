import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import { useNavigate } from "react-router-dom";

function Login(props) {
     //console.log(props);
     const [errors,setErrors] = useState([]);
     const [error,setError] = useState('');
 
 
     //const ShowTheLocationWithRouter = withRouter('/');
     const navigate = useNavigate();
 
     useEffect(() => {
       if(props.AuthStore.appState != null){
         if(props.AuthStore.appState.isLoggedIn){
           navigate('/');
         }
       }
     });
 
     const handleSubmit = (values) => {
         axios.post('http://localhost:4000/api/login', {...values})
         .then(res => {
             console.log(res)
             if(res.data.success){
                 const userData = {
                   id:res.data.user_data.id,
                   name:res.data.user_data.name,
                   email:res.data.user_data.email,
                   access_token:res.data.response.token
                 };
                     const appState = {
                     isLoggedIn:true,
                     user:userData
                     };
 
                     //props.AuthStore.saveToken(JSON.stringify(appState));
                     props.AuthStore.saveToken(appState);
                     navigate('/');
               }
               else {
                 alert('Giriş Yapamadınız');
               }
         })
         .catch(error => {
             //let err = error.response.data
             //console.log(err.errors)
             if(error.response){
                 let err = error.response.data;
                 setErrors(err.errors);
                 //alert(err.errors)
               }
               else if (error.request){
                 let err = error.request;
                 setError(err);
               }
               else 
               {
                 setError(error.message);
                 
               }
         })
     }
 
     let arr = [];
     Object.values(errors).forEach(value => {
       arr.push(value)
     });
 
     return (
         <div>
             <div style= {{ height : '100vh'}} className='d-flex align-items-center justify-content-center'>
             <form autoComplete="off" className="form-signin">
                 <h1 className="h3 mb-3 font-weight-normal">Giriş yap   </h1>
                 { arr.length != 0 &&  arr.map((item) => (<p>{item}</p>))}
                 { error != '' &&  (<p>{error}</p>)}
                 <Formik 
                      initialValues = {{
                             email:'',
                             password:'',
                      }}
                      onSubmit={handleSubmit}
                      validationSchema={
                         Yup.object().shape({
                           email:Yup
                                 .string()
                                 .email('Email Formatı Hatalı')
                                 .required('Email Zorunludur'),
                           password:Yup.string().required('Şifre Zorunludur'),
                         })
                       }
                      >
                          {({ 
                             values,
                             handleChange,
                             handleSubmit,
                             handleBlur,
                             errors,
                             isValid,
                             isSubmitting,
                             touched
                         }) => ( 
                             <div>
                                 <div className="form-group">
                                     <label htmlFor="inputEmail" className="sr-only">Email Adres</label>
                                     <input 
                                     type="email" 
                                     className="form-control" 
                                     placeholder="Email address"
                                     value={values.email} 
                                     onChange={handleChange('email')}
                                    />
                                    {(errors.email && touched.email) && <p>{errors.email}</p>}
                                 </div>
                                 <div className="form-group">
                                     <label htmlFor="inputPassword" className="sr-only">Şifre</label>
                                     <input
                                     type="password" 
                                     className="form-control" 
                                     placeholder="Şifre" 
                                     value={values.password} 
                                     onChange={handleChange('password')}
                                     />
                                     {(errors.password && touched.password) && <p>{errors.password}</p>}
                                 </div>
                                 <button 
                                 className="btn btn-lg btn-primary btn-block" 
                                 type="button"
                                 //disabled={!isValid || isSubmitting}
                                 onClick={handleSubmit}
                                 >
                                 Giriş yap
                                 </button>
                             </div>
                         )}
                 </Formik>
                         <Link to = {'/register'}>Kayıt ol</Link>
                   
             </form>
         </div>
         </div>
     )
}

export default inject("AuthStore")(observer(Login));