import React, { useState } from 'react'
import { Form, redirect, useLoaderData } from 'react-router-dom'
import { CheckboxInput, FormInput, ImageInput, SelectInput, SubmitBtn, Textarea } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'


export const action = async ({ request }) => {
  const formData = await request.formData()
  try {

    await customFetch.post('/products', formData)
    toast.success("Product added sucessfully!")

    return redirect('/dashboard/all-products')
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

export const loader = async () => {

  try {
    const { data } = await customFetch.get('/products')
    return data
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}




const AddProduct = () => {

  const data = useLoaderData()
  const { companies, categories } = data

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>create product</h1>
      <div className='border p-8 rounded-md'>
        <Form method='post' encType='multipart/form-data' >
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <FormInput type={'text'} name={'name'} label={'Product name'} />
            <FormInput type={'number'} name={'price'} label={'Product price'} />
            <SelectInput label={'Select Product Category'} name={'category'} list={categories} />
            <SelectInput label={'Select Product company'} name={'company'} list={companies} />
            <FormInput type={'number'} name={'inventory'} label={'Product inventory'} defaultValue={15} />
            <FormInput type={'text'} name={'colors'} label={'Product color'} />
            <CheckboxInput name={'freeShipping'} label={'Free shipping'} />
            <CheckboxInput name={'featured'} label={'Featured'} />
            <div className=' md:col-span-2 '>
              <Textarea name={'description'} labelText={'Product Description'} />
            </div>
            <ImageInput name={'image'} labelText={'Add product image'} image='' />

          </div>
          <SubmitBtn text={'Add product'} />

        </Form>
      </div>

    </section>
  )
}

export default AddProduct