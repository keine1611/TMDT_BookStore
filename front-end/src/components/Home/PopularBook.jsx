import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard'





const PopularBook = () => {
    const categories = [
        {
            title: 'Tất cả',
            value: 'all'
        },
        {
            title: 'Truyện Tranh - Manga',
            value: '1'
        },
        {
            title: 'Sách Kinh Tế',
            value: '2'
        },
        {
            title: 'Văn Học - Tiểu Thuyết',
            value: '3'
        },
        {
            title: 'Thường Thức - Đời Sống',
            value: '4'
        },
        {
            title: 'Kỹ Năng - Sống Đẹp',
            value: '5'
        }
    ]

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

    const [data, setData] = useState([])
    const [dataFilter, setDataFilter] = useState([])
    const [active, setActive] = useState('all')

    useEffect(()=>{
        if(active === 'all')
            setDataFilter(data)
        else
        setDataFilter(data.filter((book)=>book.category.id === Number(active)))
    },[active, data])


    const HandleCategoryClick = (value) => {
        setActive(value)
    }

    useEffect(()=>{
        setDataFilter(data)
    },[data])

    
    
    useEffect(() => {
        const GetBook = async () => {
            axios.get('/api/books')
                .then((result) => {
                    setData(shuffle(result.data))
            })
        }
        GetBook()
    }, [])

    return (
        <section id="popular-books" className="bookshelf py-5 my-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <div className="section-header align-center">
                            <div className="title">
                                <span>Some quality items</span>
                            </div>
                            <h2 className="section-title mt-2">Sách nổi bật</h2>
                        </div>

                        <ul className="tabs">
                            {categories.map((category, index) => {
                                if (category.value === active)
                                    return <li key={index} data-tab-target="#all-genre" className="active tab" onClick={() => HandleCategoryClick(category.value)}>{category.title}</li>
                                else
                                    return <li key={index} data-tab-target="#all-genre" className="tab" onClick={() => HandleCategoryClick(category.value)}>{category.title}</li>
                            })}
                        </ul>

                        <div className="tab-content">
                            <div id="all-genre" data-tab-content className='active'>
                                <div className="row">
                                    {dataFilter.map((book) => {
                                        return (
                                           <BookCard key={book.id} book={book} />
                                        )
                                    })}
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default PopularBook