import React from 'react'
import { Form, Link, useLoaderData, useSubmit } from 'react-router-dom'
import FormInput from './FormInput'
import SelectInput from './SelectInput'
import FormRange from './FormRange'
import CheckboxInput from './CheckboxInput'

const Filters = () => {
    const{categories,companies,params}=useLoaderData()
    const submit=useSubmit()
    const debounce = (onChange) => {
        let timeout;
        return (e) => {
          const form = e.currentTarget.form;
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            onChange(form);
          }, 2000);
        };
      };
  return (
      
  <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
  <FormInput  type='search'
    label='search product'
    name='search'
    onChange={(e)=>{
      submit(e.currentTarget.form)
  }}

    />
   
   <SelectInput label={'Select Product Category'} name={'category'} list={['all' ,...categories]}  onChange={(e)=>{
        submit(e.currentTarget.form)
    }}
   
    />
   <SelectInput label={'Select Product company'} name={'company'} list={['all',...companies]}  onChange={(e)=>{
        submit(e.currentTarget.form)
    }}
   
    />
   <SelectInput label={'Sort Products'} name={'sort'}  list={['a-z', 'z-a', 'highest', 'lowest']}  onChange={(e)=>{
        submit(e.currentTarget.form)
    }}
   
    
    />

  
      <CheckboxInput name={'freeShipping' } label={'Free shipping'}  onChange={(e)=>{
        submit(e.currentTarget.form)
    }}   />
      <CheckboxInput name={'featured' } label={'Featured'}  onChange={(e)=>{
        submit(e.currentTarget.form)
    }} />

<Link to='/dashboard/all-products' className='btn btn-accent btn-sm'>
      reset
    </Link>
</Form>
  )
}

export default Filters