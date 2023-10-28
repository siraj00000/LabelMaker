import { TfiFilter } from 'react-icons/tfi';
import { useSearchParams } from 'react-router-dom';
const Filter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const handleFilter = () => {
        const order: 'asc' | 'desc' = searchParams.get('sortOrder') as 'asc' | 'desc' || 'asc';
        if (order === 'asc') {
            setSearchParams({ sortOrder: 'desc' })
            return
        }

        setSearchParams({ sortOrder: 'asc' })
    }
    return (
        <button onClick={handleFilter} className='border border-secondaryLightGray rounded-md p-3 hover:bg-secondaryLightBlue text-primaryDarkGray hover:text-primaryGreen'>
            <TfiFilter />
        </button>
    )
}

export default Filter
