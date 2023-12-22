"use client";
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserFormValidation, userFormValidationScheme } from './validation';
import { Label } from './components/label';
import { Input } from './components/input';
import { PrefectureSelect } from './components/prefectureSelect';

export default function UserForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  }= useForm<UserFormValidation>({
    resolver: zodResolver(userFormValidationScheme),
  })

  const prefectureWatch = watch('prefecture', '')

  async function onSubmit(data: UserFormValidation) {
    const response = await fetch('https://httpstat.us/201', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
    console.log(response)
  }

  const isSelectPlaceholder = useMemo(() => {
    return prefectureWatch
  }, [prefectureWatch])

  /** MEMO:デフォルトフォームがいまいち */
  /** MEMO:validation後の画面の動きが気になる */
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className='w-[400px] h-[450px] text-black bg-white py-[14px] px-[30px]'>
        <div className='flex flex-col text-[12px] font-bold'>
          <div className='mb-[12px] flex items-center'>
            <Label labelName="氏名" />
            <Input
              error={errors.name?.message ?? ''}
              placeholder={'(例)トレタ 太郎'}
              {...register('name')}
            />
          </div>
          <div className='mb-[12px] flex items-center'>
            <Label labelName="Eメール" />
            <Input
              error={errors.email?.message ?? ''}
              placeholder={'(例)yoyaku@toreta.in'}
              {...register('email')}
            />
          </div>
          <div className='mb-[12px] flex items-center'>
            <Label labelName="郵便番号" />
            <Input
              error={errors.zip?.message ?? ''}
              placeholder={'(例)0000000'}
              maxLength={7}
              customStyle='w-[100px]'
              {...register('zip')}
            />
          </div>
          <div className='mb-[12px] flex items-center'>
            <Label labelName="都道府県" />
            <PrefectureSelect
              error={errors.prefecture?.message ?? ''}
              isPlaceholder={isSelectPlaceholder === ''}
              {...register('prefecture')}
            />
          </div>
          <div className='mb-[12px] flex items-center'>
            <Label labelName="市区町村・番地" />
            <Input
              error={errors.address1?.message ?? ''}
              placeholder={'(例)品川区西五反田７丁目２２−１７'}
              maxLength={7}
              {...register('address1')}
            />
          </div>
          <div className='mb-[15px] flex items-center'>
            <Label labelName="建物名・号室" />
            <Input
              error={errors.address2?.message ?? ''}
              placeholder={'(例)TOCビル 8F'}
              {...register('address2')}
            />
          </div>
          <div className='flex items-center mt-[15px] self-center'>
            <button
              type="submit"
              className='w-[100px] h-[40px] border rounded-lg bg-[#5DD66980] text-white text-center'>
              登録
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}