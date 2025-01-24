import { Form, Link, redirect } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';


export const action=async({request})=>{

    const formData=await request.formData()
    const data=Object.fromEntries(formData)

    try {
      
      await customFetch.post('/auth/login',data)
      toast.success("Logged in succesfully")
      return redirect('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    return error;
    }
}
const Login = () => {


  return (
   <section className=' h-screen grid place-items-center'>
    <Form method='post' className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4' >
      <p>email: admin@gmail.com</p>
      <p>password: password</p>
      <p>Or simply click the login button</p>
    <h4 className='text-center text-3xl font-bold'>Login</h4>
        
        <FormInput type='email' label='email' name='email' defaultValue={'admin@gmail.com'}/>
        
        <FormInput type='password' label='password' name='password' defaultValue={'password'} />
        <div className='mt-4'>
          <SubmitBtn text='login' />
        </div>

        <p className='text-center'>
       Don't have an account yet?
          <Link
            to='/register'
            className='ml-2 link link-hover link-primary capitalize'
          >
            register
          </Link>
        </p>

    </Form>
   </section>
  );
};
export default Login;