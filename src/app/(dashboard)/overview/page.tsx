import MainLayout from '@/components/MainLayout'
import StatCard from '@/components/StatCard'
import React from 'react'

function Page() {
  return (
    <MainLayout>
       <div className='flex flex-col gap-y-4'>
        <StatCard text='Expenditure' amount={100000} />
        <StatCard text='Income' amount={100000} />
        <StatCard text='Total' amount={100000} />
       </div>
    </MainLayout>
  )
}

export default Page