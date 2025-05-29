import React from 'react'
import { useState } from 'react';
import { FaUser } from 'react-icons/fa'

const Login = () => {
    const [formData, setFormData] = useState({ name: '', password: '' })
    const { name, password } = formData;

    console.log(formData);

    const onChange = (e) => { 
        setFormData ((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => { 
        e.preventDefault();
            setFormData({
                 name: '', password: '',
            });
        };

    return (
        <>
            <section className='heading'>
                <h1><FaUser />Login</h1>
                <p>Log in to your account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input required type="text" className='form-control' id="name" name="name"
                         value={name} placeholder='Please enter your name' onChange={onChange}/>
                    </div>


                    <div className='form-group'>
                        <input required type="password" className='form-control' id="password" name="password"
                         value={password} placeholder='Please enter your password' onChange={onChange}/>
                    </div>
                    
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Log in</button>
                    </div>                                                                              
                </form>
            </section>
        </>
    )
}

export default Login