import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

interface PaginationTypes {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationTypes> = ({ currentPage, totalPages, totalItems, itemsPerPage }) => {
  const navigate = useNavigate();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const availableLimits = [5, 10, 15];
  const [selectedLimit, setSelectedLimit] = useState(itemsPerPage);

  const goToPreviousPage = () => {
    if (isFirstPage) return;
    navigate(`?page=${currentPage - 1}&limit=${selectedLimit}`);
  };

  const goToNextPage = () => {
    if (isLastPage) return;
    navigate(`?page=${currentPage + 1}&limit=${selectedLimit}`);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    navigate(`?page=${currentPage}&limit=${newLimit}`);
    setSelectedLimit(newLimit);
  };

  return (
    <div>
      <form>
        <div className="flex items-center justify-end gap-20 max-sm:gap-5 p-4 bg-white border-t border-secondaryLightGray">
          <div className="flex items-center gap-2">
            <h6 className='text-xs font-medium text-primaryDarkGray'>Rows per page</h6>
            <div className="text-primaryDarkGray text-xs font-medium">
              <select value={selectedLimit} onChange={handleLimitChange}>
                {availableLimits.map((limitOption) => (
                  <option key={limitOption} value={limitOption}>
                    {limitOption}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-primaryDarkGray text-xs font-medium">
            <h6>1 - {totalItems} of {itemsPerPage}</h6>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`px-2 py-1 text-sm rounded-md hover:scale-105 ${isFirstPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-sky-600 text-white'
                }`}
              onClick={goToPreviousPage}
              disabled={isFirstPage}
            >
              <BsChevronLeft />
            </button>
            <button
              type="button"
              className={`px-2 py-1 text-sm rounded-md hover:scale-105 ${isLastPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-sky-600 text-white'
                }`}
              onClick={goToNextPage}
              disabled={isLastPage}
            >
              <BsChevronRight />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Pagination;
