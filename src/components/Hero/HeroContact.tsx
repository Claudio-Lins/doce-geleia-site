'use client'

import { FormEvent, useCallback, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import 'react-toastify/dist/ReactToastify.css'
import { yupResolver } from '@hookform/resolvers/yup'

interface HeroContactProps {
  initialValues?: {
    name: string
    email: string
    phone: string
    message: string
  }
}


const validationSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  message: yup.string().required('Mensagem é obrigatória'),
})

export function HeroContact({ initialValues }: HeroContactProps) {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues, resolver: yupResolver(validationSchema)
  })


  const handleKeyUpPhone = useCallback((event: FormEvent<HTMLInputElement>) => {
    event.currentTarget.maxLength = 17
    let value = event.currentTarget.value
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{3})(\d{3})(\d{3})/, '($1) $2 $3 ')
    event.currentTarget.value = value
  }, [])

  const success = () => toast('Enviado com Sucesso')

  const onSubmit = async (data: any) => {
    await fetch('/api/contact/create-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    reset()
    success()
  }

  const onError = (errors: any) => {
    console.log(errors)
  }

  return (
    <>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <div
        id='contact'
        className='z-[2] mt-12 w-full max-w-md border bg-white bg-opacity-20 p-8 text-white backdrop-blur-sm md:-ml-[650px] md:scroll-mt-40'
      >
        <h2 className='text-2xl font-bold text-white'>Contact</h2>
        <hr />
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className='mt-6 flex w-full flex-col gap-4'
        >
          <div className='flex flex-col'>
            <label htmlFor='name'>Nome</label>
            <input
              {...register('name', { required: true })}
              type='text'
              name='name'
              id='name'
              className='rounded-md border border-white p-2 text-zinc-900'
            />
            {
              errors.name && <span className='text-red-500 text-xs ml-1 mt-1 p-1 rounded-md bg-white'>{errors.name.message}</span>
            }
          </div>
          <div className='flex flex-col'>
            <label htmlFor='email'>Email</label>
            <input
              {...register('email', { required: true })}
              type='email'
              name='email'
              id='email'
              className='rounded-md border border-white p-2 text-zinc-900'
            />
            {
              errors.email && <span className='text-red-500 text-xs ml-1 mt-1 p-1 rounded-md bg-white'>{errors.email.message}</span>
            }
          </div>
          <div className='flex flex-col'>
            <label htmlFor='phone'>Telemóvel</label>
            <input
              {...register('phone', { required: false })}
              type='tel'
              onKeyUp={handleKeyUpPhone}
              name='phone'
              id='phone'
              className='rounded-md border border-white p-2 text-zinc-900'
            />
              {
              errors.phone && <span className='text-red-500 text-xs ml-1 mt-1 p-1 rounded-md bg-white'>{errors.phone.message}</span>
              }
          </div>
          <div className='flex flex-col'>
            <label htmlFor='message'>Mensagem</label>
            <textarea
              {...register('message', { required: true })}
              name='message'
              id='message'
              rows={5}
              className='rounded-md border border-white p-2 text-zinc-900'
            />
            {
              errors.message && <span className='text-red-500 text-xs ml-1 mt-1 p-1 rounded-md bg-white'>{errors.message.message}</span>
            }
          </div>
          <button
            type='submit'
            className={`mt-10 border px-8 py-2 transition-all duration-700 hover:bg-zinc-50 hover:text-zinc-900
             ${
              errors ? 'cursor-not-allowed' : 'cursor-pointer'
             }
            `}
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  )
}
