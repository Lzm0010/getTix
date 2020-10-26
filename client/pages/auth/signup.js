import {useState} from 'react';
import axios from 'axios';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/signup', {
        email, password
      });
  
      console.log(response.data);
    } catch(err) {
      setErrors(err.response.data.errors)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input className="form-control" onChange={e => setEmail(e.target.value)} value={email}/>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} value={password}/>
      </div>
      { errors.length > 0 && (
        <div className="alert alert-danger">
          <h4>Oooops....</h4>
          <ul className="my-0">
            {errors.map(err => (
            <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
       )
      }
      <button className="btn btn-primary">Sign Up</button>
    </form>
  )
}