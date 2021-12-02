import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import { useNavigate } from "react-router-dom";
import Layout from '../../components/layouts/front.layout'

function OperationAdd(props) {

    const [errors,setErrors] = useState([]);
     const [error,setError] = useState('');
     const navigate = useNavigate();

     const [categories,setCategory] = useState([]);
     const [currencies,setCurrency] = useState([]);

     const handleSubmit = (values) => {
        const token = props.AuthStore.appState.user.access_token;
        axios.post('http://localhost:4000/api/add-operation', {...values},{
            headers:{
                Authorization: 'Bearer '+ token
            }
        })
        .then(res => {
            console.log(res)
            alert('Eklendi');
        })
        .catch(error => {
            if(error.response){
                let err = error.response.data;
                console.log(err)
                setErrors(err.errors);
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

    useEffect(() => {
        const token = props.AuthStore.appState.user.access_token;
        axios.get('http://localhost:4000/api/category',{
            headers:{
                Authorization: 'Bearer '+ token
            }
        }).then((res) => {
            setCategory(res.data);
        })
        .catch(e => {
            console.log(e);
        }); 
    },[])

    useEffect(() => {
        const token = props.AuthStore.appState.user.access_token;
        axios.get('http://localhost:4000/api/currency',{
            headers:{
                Authorization: 'Bearer '+ token
            }
        }).then((res) => {
            setCurrency(res.data);
        })
        .catch(e => {
            console.log(e);
        }); 
    },[])

 

    return (
        <div>
            Operasyon ekleme 
            <Layout>
            </Layout>
            <div style= {{ height : '70vh'}} className='d-flex align-items-center justify-content-center'>
             <form autoComplete="off" className="form-signin">
                 <h1 className="h3 mb-3 font-weight-normal"> Operation Add </h1>
                 
                 { error != '' &&  (<p>{error}</p>)}
                 <Formik 
                      initialValues = {{
                             category:'',
                             currency:'',
                             total:'',
                             description: ''
                      }}
                      onSubmit={handleSubmit}
                      validationSchema={
                         Yup.object().shape({
                           // category:Yup.number().required('Kategori Zorunludur'),
                            //currency:Yup.number().required('Para Birimi Zorunludur'),
                            total:Yup.number().required('Tutar Zorunludur'),
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
                                     <label htmlFor="inputEmail" className="sr-only">Kategori Seçin</label>
                                     <select class="form-select" aria-label="Default select example"
                                     onChange={handleChange('category')}>
                                        <option selected>Open this select menu</option>
                                        {
                                            categories.map(category => (
                                                <option value={category.id}>{category.category_name}</option>
                                            ))
                                        }
                                    </select>
                                   
                                    {(errors.category && touched.category) && <p>{errors.category}</p>}
                                 </div>

                                 <div className="form-group">
                                     <label htmlFor="inputEmail" className="sr-only">Para Birimi Seçin</label>
                                     <select class="form-select" aria-label="Default select example"
                                        onChange={handleChange('currency')}
                                     >
                                        <option selected>Open this select menu</option>
                                        {
                                            currencies.map(currency => (
                                                <option value={currency.id}>{currency.currency}</option>
                                            ))
                                        }
                                    </select>
                                   
                                    {(errors.currency && touched.currency) && <p>{errors.currency}</p>}
                                 </div>
                                 
                                 
                                 <div className="form-group">
                                     <label htmlFor="inputEmail" className="sr-only">Tutar</label>
                                     <input 
                                     type="text" 
                                     className="form-control" 
                                     placeholder="Tutar girin"
                                     value={values.total} 
                                     onChange={handleChange('total')}
                                    />
                                    {(errors.total && touched.total) && <p>{errors.total}</p>}
                                 </div>
                                 <div className="form-group">
                                     <label htmlFor="inputPassword" className="sr-only">Açıklama</label>
                                     <input
                                     type="text" 
                                     className="form-control" 
                                     placeholder="Açıklama Girin" 
                                     value={values.description} 
                                     onChange={handleChange('description')}
                                     />
                                     {(errors.description && touched.description) && <p>{errors.description}</p>}
                                 </div>
                                 <button 
                                 className="btn btn-lg btn-primary btn-block" 
                                 type="button"
                                 //disabled={!isValid || isSubmitting}
                                 onClick={handleSubmit}
                                 >
                                 Operasyon ekle
                                 </button>
                             </div>
                         )}
                 </Formik>
                        
                   
             </form>
         </div>
        </div>
    )
}

export default inject("AuthStore")(observer(OperationAdd));