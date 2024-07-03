import { Form, Link, redirect, useNavigation } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';


export const action=async({request})=>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/auth/register',data)
        toast.success('Registration successful');
    return redirect('/login')
    
  } catch (error) {
    toast.error(error?.response?.data?.msg);
console.log(error);
    return error;
  }


  
}
const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
   <section className=' h-screen grid place-items-center'>
    <Form method='post' className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4' >
    <h4 className='text-center text-3xl font-bold'>Register</h4>
        <FormInput type='text' label='First name' name='name' />
        <FormInput type='text' label='Last name' name='lastName' />
        <FormInput type='email' label='email' name='email' />
        <FormInput type='text' label='Location' name='location' />
        <FormInput type='password' label='password' name='password' />
        <div className='mt-4'>
          <SubmitBtn text='register'isSubmitting={isSubmitting} />
        </div>

        <p className='text-center'>
          Already a member?
          <Link
            to='/login'
            className='ml-2 link link-hover link-primary capitalize'
          >
            login
          </Link>
        </p>

    </Form>
   </section>
  );
};
export default Register;