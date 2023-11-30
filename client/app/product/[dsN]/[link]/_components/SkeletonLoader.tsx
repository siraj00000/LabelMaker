import React from 'react'

const SkeletonLoader = () => {
  return (
    <aside className='md:space-y-3'>
      <section className='flex flex-col items-center justify-center w-full p-10'>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 w-3/5 mb-5">
          <div className="h-20 w-full bg-gray-300 rounded-3xl animate-pulse delay-150" />
          <div className="h-20 w-full bg-gray-300 rounded-3xl animate-pulse delay-200" />
          <div className="h-20 w-full bg-gray-300 rounded-3xl animate-pulse delay-300" />
        </div>

        <div className="h-4 w-1/2 bg-gray-300 rounded-md mb-2 animate-pulse delay-150"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded-md mb-2 animate-pulse delay-200"></div>
        <div className="h-4 w-1/3 bg-gray-300 rounded-md mb-2 animate-pulse delay-300"></div>
      </section>

      <section role="status" className="grid md:grid-cols-2 grid-cols-1 gap-5 w-full animate-pulse md:p-20 md:pt-0 p-4 dark:border-gray-700">
        <div className="bg-gray-300 rounded-2xl h-full"></div>
        <div className="h-96 space-y-6">
          <div className="h-24 w-full bg-gray-300 rounded-2xl" />

          <div className="w-full space-y-3">
            <div className="h-4 w-4/5 bg-gray-300 rounded-md mb-2 animate-pulse delay-300" />
            <div className="h-4 w-4/5 bg-gray-300 rounded-md mb-2 animate-pulse delay-300" />
            <div className="h-4 w-4/5 bg-gray-300 rounded-md mb-2 animate-pulse delay-300" />
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
            <div className="h-20 w-full bg-gray-300 rounded-3xl" />
            <div className="h-20 w-full bg-gray-300 rounded-3xl" />
            <div className="h-20 w-full bg-gray-300 rounded-3xl" />
          </div>
          <div className="w-full space-y-3">
            <div className="h-4 w-2/3 bg-gray-300 rounded-md mb-2 animate-pulse delay-300" />
            <div className="h-4 w-1/3 bg-gray-300 rounded-md mb-2 animate-pulse delay-300" />
          </div>
        </div>
      </section>

    </aside >
  )
}

export default SkeletonLoader
