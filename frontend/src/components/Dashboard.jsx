import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookForm from './BookForm';


const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate])

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <div style = {{display: 'flex', justifyContent:'center'}}>
          <button className='btn'  onClick={() => navigate('/allbooks')}>Check your books</button>
        </div>
      </section>
      <BookForm />
    </>
  )
}
export default Dashboard