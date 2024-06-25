import MainLayout from '@/components/MainLayout'

function Page() {
  return (
    <MainLayout>
 <p className="font-semibold text-xl mb-3">Income</p>
      <div className="flex flex-col gap-y-5">
        <div>
          <p>Income name</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered text-gray-600 placeholder:text-gray-500 w-full max-w-xs"
          />
        </div>

        <div>
          <p>Amount</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered text-gray-600 placeholder:text-gray-500 w-full max-w-xs"
          />
        </div>

        <div className="bg-black text-gray-300 max-w-fit px-8 py-3 rounded-md">
          Submit
        </div>
      </div>
   </MainLayout>
  )
}

export default Page