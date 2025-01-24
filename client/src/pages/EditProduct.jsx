import React, { useState } from 'react'
import { Form, redirect, useLoaderData } from 'react-router-dom'
import { CheckboxInput, FormInput, ImageInput, SelectInput, SubmitBtn, Textarea } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'


export const action = async ({ request, params }) => {
  const formData = await request.formData()


  try {

    await customFetch.patch(`/products/${params.id}`, formData)
    toast.info("Product Updated sucessfully!")

    return redirect('/dashboard')
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

export const loader = async ({ params }) => {

  try {
    const response1 = await customFetch.get(`/products/${params.id}`)
    const product = response1.data.product

    const response2 = await customFetch.get('/products')
    const categories = response2.data.categories
    const companies = response2.data.companies
    return { product, categories, companies }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}




const EditProduct = () => {

  const { product, categories, companies } = useLoaderData()



  return (

    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>Edit Product {product.name}</h1>
      <div className='border p-8 rounded-md'>
        <Form method='post' encType='multipart/form-data' >
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <FormInput type={'text'} name={'name'} label={'Product name'} defaultValue={product.name} />
            <FormInput type={'number'} name={'price'} label={'Product price'} defaultValue={product.price} />
            <SelectInput label={'Select Product Category'} name={'category'} defaultValue={product.category} list={categories} />
            <SelectInput label={'Select Product company'} name={'company'} defaultValue={product.company} list={companies} />
            <FormInput type={'number'} name={'inventory'} label={'Product inventory'} defaultValue={product.inventory} />
            <FormInput type={'text'} name={'colors'} label={'Product color'} defaultValue={product?.colors?.map((item) => item)} />
            <CheckboxInput name={'freeShipping'} label={'Free shipping'} defaultValue={product.freeShipping} />
            <CheckboxInput name={'featured'} label={'Featured'} defaultValue={product.featured} />
            <div className=' md:col-span-2 '>
              <Textarea name={'description'} labelText={'Product Description'} defaultValue={product.description} />
            </div>
            <ImageInput name={'image'} labelText={'Add product image'} image={product?.image} />

          </div>
          <SubmitBtn text={'Edit product'} />

        </Form>
      </div>

    </section>
  )
}

export default EditProduct