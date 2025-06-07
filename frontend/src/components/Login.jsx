import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../store/apis/userApi';
import { setUser } from '../store/slices/userSlice';
import { toast } from 'react-toastify';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[login, {isLoading}] = useLoginMutation();
    const {user} = useSelector(state => state.user);


    const [formData, setFormData] = useState({ email: '', password: '' })
    const { email, password } = formData;

    console.log(formData);

    const onChange = (e) => { 
        setFormData ((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
        const response = await login(formData);
        if(response.error){
            toast.error(response.error.data?.message || response.error.error || 'login failed');
        }else{
            dispatch(setUser(response.data));
            localStorage.setItem('user', JSON.stringify(response.data))
            navigate('/');
            toast.success(`Welcome ${response.data.name}!`);
        };
    }catch(err){
        console.log('Login failed', err);
    }

    };

    useEffect(() => {
        if(user){
            navigate('/');
        } 
    }, [user, navigate]);

    return (
        <>
            <section className='heading'>
                <h1><FaUser />Login</h1>
                <p>Log in to your account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input required type="text" className='form-control' id="email" name="email"
                         value={email} placeholder='Please enter your email' onChange={onChange}/>
                    </div>


                    <div className='form-group'>
                        <input required type="password" className='form-control' id="password" name="password"
                         value={password} placeholder='Please enter your password' onChange={onChange}/>
                    </div>
                    
                    <div className='form-group'>
                        <button type='submit' disabled={isLoading} className='btn btn-block' >{isLoading ? "Please wait " : "Login"}</button>
                    </div>                                                                              
                </form>
            </section>
        </>
    )
}

export default Login
