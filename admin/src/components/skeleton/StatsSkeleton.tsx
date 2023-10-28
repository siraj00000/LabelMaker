const StatsSkeleton = () => {
    const articles = Array.from({ length: 4 }, (_, index) => (
        <article key={index} className='bg-gray-200 h-32 animate-pulse rounded-lg'></article>
    ));
    return (
        <main>
            <section className='grid md:grid-cols-4 grid-cols-1 gap-5 px-10 mt-10 mb-5'>
                {articles}
            </section>

            <aside className='grid md:grid-cols-6 grid-cols-1 gap-5 pt-0 p-10 animate-pulse'>
                <section className='bg-gray-200 h-96 md:col-span-4 col-span-1 rounded-lg'></section>
                <section className='bg-gray-200 h-96 md:col-span-2 col-span-1 rounded-lg'></section>
            </aside>
        </main>
    )
}

export default StatsSkeleton
