import React from 'react'
import BookCard from '../BookCard'

const ListBook = ({books}) => {
    return (
        <div className="tab-content">
            <div id="all-genre" data-tab-content className='active'>
                <div className="row">
                    {books.map((book) => {
                        return (
                            <BookCard key={book.id} book={book}></BookCard>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default ListBook