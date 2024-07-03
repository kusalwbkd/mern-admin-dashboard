import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();

  if(error.status === 404){
    return(
      <div className=' h-screen grid place-content-center px-8'>
        <div className=' text-center'>
        <h1 className=' text-center text-8xl font-bold text-primary'>404</h1>
        <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>
            Page not found
          </h1>
          <p className='mt-6 text-lg leading-7 '>
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className='mt-10 '>
            <Link to='/dashboard' className='btn btn-secondary'>
              Go back home
            </Link>
          </div>
          </div>
      </div>
    )
  }
  return (
    <div className=' h-screen grid place-content-center px-8'>
    <h4 className='text-center font-bold text-4xl'>there was an error... </h4>
    </div>
  );
};
export default Error;