import React,{ useState,useEffect} from 'react';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import { useNavigate ,Link} from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, NavbarText, 
    DropdownItem, UncontrolledDropdown, DropdownToggle, DropdownMenu} from 'reactstrap'
//import { LinkContainer } from 'react-router-bootstrap';
const Layout = (props) => {
    //console.log(props);
    const [user,setUser] = useState({});
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    props.AuthStore.getToken();
    const navigate = useNavigate();

    useEffect(() => {
        const token = (props.AuthStore.appState != null) ? props.AuthStore.appState.user.access_token : null;
        axios.post('http://localhost:4000/api/authenticate',{},{
            headers:{
                Authorization: 'Bearer '+ token
            }
        }).then((res) => {
            //console.log('aa');
            //console.log(res)
            if(!res.data.isLoggedIn){
                navigate('/login');
            }
            setUser(res.data.user);
            setIsLoggedIn(res.data.isLoggedIn);
        })
        .catch(e => {
            navigate('/login');
        }); 
    },[])

    const logout = () => {
        
        axios.get('http://localhost:4000/api/logout',{},{
            headers:{
                Authorization: 'Bearer '+ props.AuthStore.appState.user.access_token
            }
        }).then(res => console.log(res)).catch(e => console.log(e));
        props.AuthStore.removeToken();
        navigate('/login');
    }
    return (
        <div>
            <Navbar
                        color="light"
                        expand="md"
                        light
                    >
                        <NavbarBrand href="/">
                            User HomePage
                        </NavbarBrand>
                        <NavbarToggler onClick={function noRefCheck() { }} />
                        <Collapse navbar>
                            <Nav
                                className="me-auto"
                                navbar
                            >
                                <NavItem>
                                    <NavLink>
                                     <Link to = {'/add-operation'}>
                                        Ekle
                                        </Link>
                                    </NavLink>
                                    
                                </NavItem>
                                <NavItem>
                                    <NavLink>
                                     <Link to = {'/'}>
                                        Listele
                                        </Link>
                                    </NavLink>
                                </NavItem>
                                <UncontrolledDropdown inNavbar nav >
                                        <DropdownToggle caret nav>
                                           
                                            {user.name}
                                        </DropdownToggle>
                                        <DropdownMenu end>
   
                                           <DropdownItem>
                                                 Profil Düzenle
                                            </DropdownItem>
                                            <DropdownItem>
                                                 Şifre Değiştir
                                            </DropdownItem>

                                         <DropdownItem divider /> 
                                         <DropdownItem>
                                             <button onClick = {logout}> Çıkış </button>
                                                   
                                        </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                            </Nav>
                            <NavbarText>
                                Simple Text
                            </NavbarText>
                        </Collapse>
                    </Navbar>
                
           
            <div>{props.children}</div>
        </div>
    )
}

export default inject("AuthStore")(observer(Layout));