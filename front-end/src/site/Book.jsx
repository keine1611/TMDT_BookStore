import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Breadcrumd from '../components/Breadcrumd'
import Filter from '../components/Book/Filter'
import ListBook from '../components/Book/ListBook'

const Book = () => {

    function shuffle(arra1) {
        var ctr = arra1.length, temp, index;

        // While there are elements in the array
        while (ctr > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * ctr);
            // Decrease ctr by 1
            ctr--;
            // And swap the last element with it
            temp = arra1[ctr];
            arra1[ctr] = arra1[index];
            arra1[index] = temp;
        }
        return arra1;
    }

    const [books, setBooks] = useState([])

    const [fiteredBooks, setFilteredBooks] = useState([])
    const [searchParams, setSearchParams] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [sortType, setSortType] = useState('')
    const [priceRange, setPriceRange] = useState('')

    const handleSearchParamsChange = (value) => {
        setSearchParams(value.toLowerCase())
    }

    const handleCategoryFilter = (value) => {
        setCategoryFilter(value)
    }

    const handleSortTypeChange = (value) => {
        setSortType(value)
    }

    const handlePriceChange = (value)=>{
        setPriceRange(value)
    }

    const handleReset = ()=>{
        setCategoryFilter('')
        setSortType('')
        setPriceRange('')
        setSearchParams('')
    }

    

    useEffect(() => {
        const GetBook = async () => {
            axios.get('/api/books')
                .then((result) => {
                    setBooks(shuffle(result.data))
                    setFilteredBooks(shuffle(result.data))
                })
        }    
        GetBook()
    }, [])

    useEffect(() => {
        const applyFilters = () => {
            let result = [...books];
    
            if (searchParams) {
                result = result.filter(item => item.book_name.toLowerCase().includes(searchParams));
            }
    
            if (categoryFilter) {
                result = result.filter(item => item.category.id === Number(categoryFilter));
            }
    
            if(priceRange){
                const obj = JSON.parse(priceRange)
                result = result.filter((item)=>  Number(obj.min) <= Number(item.book_price) && item.book_price <=  Number(obj.max) )
            }
    
            if (sortType){
                if (sortType === 'asc') {
                    result.sort((a, b) => {
                        return Number(a.book_price) - Number(b.book_price) 
                    })
                }
                else
                    result.sort((a, b) => {
                        return - (Number(a.book_price) - Number(b.book_price))
                    })
            }
    
    
    
    
            setFilteredBooks(result);
        }
    
        applyFilters()
    }, [searchParams, categoryFilter, sortType, priceRange, books]);

    return (
        <>
            <Breadcrumd></Breadcrumd>
            <Filter handleSearchParamsChange={handleSearchParamsChange} handleCategoryFilter={handleCategoryFilter} 
                handleSortTypeChange={handleSortTypeChange} handlePriceChange={handlePriceChange} handleReset={handleReset} searchParams={searchParams} categoryFilter={categoryFilter} priceRange={priceRange} sortType={sortType}/>
            <ListBook books={fiteredBooks} />
        </>
    )
}

export default Book