import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import { useNavigate } from "react-router-dom";

function Register(props) {
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
        axios.post('http://localhost:4000/api/register', {...values})
        .then(res => {
            console.log(res)
            if(res.data.success){
                const userData = {
                  id:res.data.response.id,
                  name:res.data.response.name,
                  email:res.data.response.email,
                  access_token:res.data.token
                };
                    const appState = {
                    isLoggedIn:true,
                    user:userData
                    };

                    //props.AuthStore.saveToken(JSON.stringify(appState));
                    props.AuthStore.saveToken(appState);
                    alert('Kayıt Tamamlandı')
                    navigate('/');
              }
              else {
                alert('Kayıt başarısız');
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
                <h1 className="h3 mb-3 font-weight-normal">Kayıt ol</h1>
                { arr.length != 0 &&  arr.map((item) => (<p>{item}</p>))}
                { error != '' &&  (<p>{error}</p>)}
                <Formik 
                     initialValues = {{
                            name:'',
                            email:'',
                            password:'',
                            password_confirmation:''
                     }}
                     onSubmit={handleSubmit}
                     validationSchema={
                        Yup.object().shape({
                          email:Yup
                                .string()
                                .email('Email Formatı Hatalı')
                                .required('Email Zorunludur'),
                          name:Yup.string().required(' Ad Soyad Zorunludur'),
                          password:Yup.string().required('Şifre Zorunludur'),
                          password_confirmation:Yup.string().oneOf([Yup.ref('password'),null],'Şifreler Eşleşmiyor')      
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
                                <div div className="form-group">
                                    <label htmlFor="inputEmail" className="sr-only">Ad Soyad</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Ad Soyad Girin"
                                    name="name"
                                    onBlur={handleBlur}
                                    placeholder="Ad Soyad" 
                                    value={values.name} 
                                    onChange={handleChange('name')} 
                                    /> 
                                    {(errors.name && touched.name) && <p>{errors.name}</p>}  
                                </div>
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
                                <div className="form-group">
                                    <label htmlFor="inputPassword" className="sr-only">Şifre Tekrarı</label>
                                    <input
                                     type="password" 
                                     className="form-control" 
                                     placeholder="Şifre Tekrarı"
                                     value={values.password_confirmation} 
                                     onChange={handleChange('password_confirmation')} 
                                     />
                                     {(errors.password_confirmation && touched.password_confirmation) && <p>{errors.password_confirmation}</p>}
                                </div>
                                <button 
                                className="btn btn-lg btn-primary btn-block" 
                                type="button"
                                //disabled={!isValid || isSubmitting}
                                onClick={handleSubmit}
                                >
                                Kayıt Ol
                                </button>
                            </div>
                        )}
                </Formik>
                        <Link to = {'/login'}>Giriş Yap</Link>
                  
            </form>
        </div>
        </div>
    )
}

export default inject("AuthStore")(observer(Register));