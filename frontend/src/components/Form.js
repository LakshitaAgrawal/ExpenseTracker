import React from 'react';
import {useForm} from 'react-hook-form';
import List from './List';
import {default as api} from '../store/ApiSlice'

const Form = () => {

    const {register,handleSubmit,resetField} = useForm();
    const [addTransaction] = api.useAddTransactionMutation()

    // get all form data in this data variable and can pass this data variable to post request to post in db
    const onSubmit = async (data) => {
        if(!data) return {};
        await addTransaction(data).unwrap();
        resetField('name');
        resetField("amount");
    }

  return (
    <div className='form max-w-sm mx-auto w-96'>
        <h1 className='font-bold pb-4 text-xl'>Transaction</h1>

        <form id='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
                <div className='input-group'>
                    <input className='form-input' type='text' {...register('name')} placeholder='Sallary, HouseRent, SIP' />
                </div>
                <select className='form-input' {...register('type')}>
                    <option value="Investment" defaultValue>Investment</option>
                    <option value="Expense">Expense</option>
                    <option value="Savings">Savings</option>
                </select>
                <div className='input-group'>
                    <input className='form-input' type='text' {...register('amount')} placeholder='Amount' />
                </div>
                <div className='submit-btn'>
                    <button className='border py-2 text-white bg-indigo-500 w-full'>Make Transaction</button>
                </div>
            </div>

        </form>
        <List></List>
    </div>
  )
}

export default Form;