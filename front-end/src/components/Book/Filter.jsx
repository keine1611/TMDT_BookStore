import React from 'react'

const Filter = ({handleSearchParamsChange, handleCategoryFilter, handleSortTypeChange, handlePriceChange, handleReset, searchParams, categoryFilter, sortType, priceRange}) => {
    return (
        <div className="w-full shadow p-5 rounded-lg bg-white">
            <div className="relative">
                <div className="absolute flex items-center ml-2 h-full">
                    <svg className="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                    </svg>
                </div>
                <input value={searchParams} onChange={(e)=>handleSearchParamsChange(e.target.value)} type="text" placeholder="Tìm kiếm theo tên, tác giả, thể loại, ..." className="px-5 py-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"/>
            </div>

            <div className="flex items-center justify-between mt-2">
                <p className="font-medium">
                    Lọc
                </p>
                
                <button onClick={()=>handleReset()} className="px-4 py-3 h-fit bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                    Làm mới
                </button>
            </div>

            <div className=' mt-0'>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
                    <select value={sortType} onChange={(e)=>handleSortTypeChange(e.target.value)} className="px-3 py-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                        <option value="">Không</option>
                        <option value="asc">Giá thấp đến cao</option>
                        <option value="desc">Giá cao đến thấp</option>
                    </select>

                    <select value={categoryFilter} onChange={(e)=>handleCategoryFilter(e.target.value)} className="px-3 py-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                        <option value="">Thể loại</option>
                        <option value="1">Truyện tranh - manga</option>
                        <option value="2">Kinh tế</option>
                        <option value="3">Văn học - tiểu thuyết</option>
                        <option value="4">Thường thức - đời sống</option>
                        <option value="5">Kỹ năng - sống đẹp</option>

                    </select>

                    <select value={priceRange} onChange={(e)=>handlePriceChange(e.target.value)} className="px-3 py-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                        <option value=''>Giá</option>
                        <option value='{"min": 0,"max": 50000}'>0 - 50.000đ</option>
                        <option value='{"min": 50000,"max": 100000}'>50.000đ - 100.00đ</option>
                        <option value='{"min": 100000,"max": 150000}'>100.000đ - 150.000đ</option>
                        <option value='{"min": 150000,"max": 999999999999999}'>Hơn 150.000đ</option>
                    </select>

                </div>
            </div>
        </div>
    )
}

export default Filter