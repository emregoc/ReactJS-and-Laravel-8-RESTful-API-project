import { inject,observer } from 'mobx-react'
import React, { useState,useEffect}  from 'react'
import { useNavigate, Navigate } from "react-router-dom";
import Layout from '../../components/layouts/front.layout'
import {Table, Button} from 'reactstrap'
import axios from 'axios';

function Index(props) {
    //console.log(props);
    //console.log('asdsad');
    //props.AuthStore.getToken();

    const [operation,setOperation] = useState([]);
    //const [isLoggedIn,setIsLoggedIn] = useState(false);
    //const navigate = useNavigate();

    function dateFilter(){
        const token = props.AuthStore.appState.user.access_token;
        axios.get('http://localhost:4000/api/date-filter',{
            headers:{
                Authorization: 'Bearer '+ token
            }
        }).then((res) => {
            setOperation(res.data);
        })
        .catch(e => {
            
            console.log(e);
        }); 
    }

    function totalFilter(){
        const token = props.AuthStore.appState.user.access_token;
        axios.get('http://localhost:4000/api/total-filter',{
            headers:{
                Authorization: 'Bearer '+ token
            }
        }).then((res) => {
            setOperation(res.data);
        })
        .catch(e => {
            
            console.log(e);
        }); 
    }

    useEffect(() => {
        //console.log(props.AuthStore.appState.user.access_token)
        //const token = (props.AuthStore.appState != null) ? props.AuthStore.appState.user.access_token : null;
        const token = props.AuthStore.appState.user.access_token;
        axios.get('http://localhost:4000/api/user-operation-data',{
            headers:{
                Authorization: 'Bearer '+ token
            }
        }).then((res) => {
            //console.log('aa');
            //console.log(res);
            //console.log(props.data)
           // if(!res.data.isLoggedIn){
            //    navigate('/login');
            //}
            setOperation(res.data);
            //setIsLoggedIn(res.data.isLoggedIn);
        })
        .catch(e => {
            //navigate('/login');
            console.log(e);
        }); 
    },[])


   
    //console.log(props.AuthStore.appState);
    return (
        <div>
            index page
 
                <Layout>
                </Layout>

                <Table>
                    <thead>
                        <tr>
                            {console.log('burasi')}
                            {console.log(operation)}
                            <th>#</th>
                            <th>User Name</th>
                            <th>Category Name</th>
                            <th>Currency</th>
                            <th>Total</th>
                            <th>Description</th>
                            <th>Operation Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            operation.map(ope => (
                                <tr key = {ope.id}>
                                    <th scope="row">{ope.id}</th>
                                    <td>{ope.user[0].name}</td>
                                    <td>{ope.category[0].category_name}</td>
                                    <td>{ope.currency[0].currency}</td>
                                    <td>{ope.total}</td>
                                    <td>{ope.description}</td>
                                    <td>{ope.operation_date}</td>
                                </tr>
                            ))
                        }       
                    </tbody>
                </Table>
                <h3>Filtreleme seçenekleri</h3>
                <button onClick = {dateFilter}>Tarihe Göre Filtrele</button>
                <button onClick = {totalFilter}>Fiyata Göre Filtrele</button>
                
            
        </div>
    )
}

export default inject('AuthStore')(observer(Index))