import React from 'react';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUser } from '../store/slices/userSlice';
import { useRegisterMutation } from '../store/apis/userApi';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[register, {isLoading}] = useRegisterMutation();

    const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: '' })
    const { name, email, password, password2 } = formData;

    console.log(formData);

    const onChange = (e) => { 
        setFormData ((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if(password !== password2){
            toast.error('Passwords are different')
        } else{
            const response = await register(formData);
        if(response.error){
            toast.error(response.error.data?.message || response.error.error || 'registration failed');
        }else{
            dispatch(setUser(response.data));
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/');
            toast.success('Registration successful');
        }
    };
};


    return (
        <>
            <section className='heading'>
                <h1><FaUser />Register</h1>
                <p>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input required type="text" className='form-control' id="name" name="name"
                         value={name} placeholder='Please enter your name' onChange={onChange}/>
                    </div>

                    <div className='form-group'>
                        <input required type="email" className='form-control' id="email" name="email"
                         value={email} placeholder='Please enter your email' onChange={onChange}/>
                    </div>

                    <div className='form-group'>
                        <input required type="password" className='form-control' id="password" name="password"
                         value={password} placeholder='Please enter your password' onChange={onChange}/>
                    </div>

                    <div className='form-group'>
                        <input required type="password" className='form-control' id="password2" name="password2"
                         value={password2} placeholder='Please retype your password' onChange={onChange}/>
                    </div> 
                    
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block' disabled={isLoading}> {isLoading ? "Please wait " : "Register"}</button>
                    </div>                                                                              
                </form>
            </section>
        </>
    )
}

export default Register