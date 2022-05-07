import React, { useState } from 'react'
import axios from 'axios'

// const URL = 'http://localhost:8000'
const URL =''

const Info = () => {
    const [user,setUser] = useState({});
    const [state,setState] = useState(true);
    const id = localStorage.getItem('id')
    // console.log(id);
    const changehandler = (e)=>{
        setUser({...user, [e.target.name]: e.target.value})
    }
    const personalhandle=()=>{
        setState(true)
    }
    const photohandle=()=>{
        setState(false)
    }
    const submithandler= async(e)=>{
        e.preventDefault();
        console.log(user);
        try{

            const data = await axios.patch(`${URL}/user/update/${id}`, user);

            console.log(data);
            alert('user signup successful')

        }catch(err){
            alert('error')
        }
        setState(false)
    }

    
    return (
        <>
            <div className='info-title'>
                <strong> Finish Account Setup</strong>
                <p>Complete your account setup by providing
                    proper Information</p>
            </div>
            <div className="info-status">
                <div className="personal">
                    <button onClick={personalhandle}>

                        <i class="fa-regular fa-circle-user"></i>
                        <span>Personal Info</span>
                    </button>

                </div>
                <div className="personal">
                    <button onClick={photohandle}>
                        <i class="fa-solid fa-camera"></i>
                        <span>uplode profile photo</span>
                    </button>
                </div>
            </div>
            {state &&
            <div className="info-container">
            <div className="form-sign">
                <form onSubmit={submithandler}>
                    <div className='form-input'>
                    <label htmlFor=" name"> name </label>
                    <input type="text" name="name" onChange={changehandler}   required />
                    </div>
                    <div className='form-input'>
                    <label htmlFor="birth"> Date of Birth </label>
                    <input type="text" name="birth" onChange={changehandler}   required />
                    </div>
                    <div className='form-input'>
                    <label htmlFor="phone">Contact No. </label>
                    <input type="number" name="phone" onChange={changehandler}   required />
                    </div>
                    <div className='form-input'>
                    <label htmlFor="education">Education </label>
                    <input type="text" name="education" onChange={changehandler}   required />
                    </div>
                    <div className='form-input'>
                    <label htmlFor="speciality">Speciality </label>
                    <input type="text" name="speciality" onChange={changehandler}   required />
                    </div>
                    <div className='form-input'>
                    <label htmlFor="company">Current Company </label>
                    <input type="text" name="company" onChange={changehandler}   required />
                    </div>
                    <div className='form-input'>
                    <label htmlFor="pincode">Pincode </label>
                    <input type="number" name="pincode" onChange={changehandler}   required />
                    </div>
                    <div className='form-input'>
                    <label htmlFor="address">Current Address </label>
                    <input type="text" name="address" onChange={changehandler}   required />
                    </div>
                    <div className='form-input border-last'>
                    <label htmlFor="bio">Your-bio <br /><span className='sortnote'>Write a short Introduction</span> </label>
                    <textarea name="bio" onChange={changehandler} cols="10" rows="10"></textarea>
                    {/* <input type="text-area" name="bio" bio=""   required /> */}
                    </div>
                    <button type='submit'>Next</button>
                </form>
                
            </div>
        </div>
            }
            {!state && <>
            <div className="info-container">
                <div className="form-photo">
                <div className="circle"><i class="fa-regular fa-pen-to-square"><input type="file" name="" onChange={changehandler} /></i></div>
                <div className="photo-status">

                    <span><i class="fa-solid fa-arrow-up-from-bracket"></i>Upload Photo</span>
                    <span><i class="fa-solid fa-camera"></i>take photo</span>
                </div>
                  <button>Submit</button>
                </div>

            </div>
            </>}

        </>
    )
}

export default Info