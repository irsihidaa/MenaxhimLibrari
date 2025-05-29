import React from 'react';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa'

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: '' })
    const { name, email, password, password2 } = formData;

    console.log(formData);

    const onChange = (e) => { 
        setFormData ((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => { 
        e.preventDefault();

        if(password !== password2){
            alert('Password does not match')
        } else{
            alert('You are successfully registered!');
            setFormData({
                 name: '', email: '', password: '', password2: '',
            });
        }
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
                        <button type='submit' className='btn btn-block'>Register</button>
                    </div>                                                                              
                </form>
            </section>
        </>
    )
}

export default Register