package com.web.book.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.book.dto.BookDTOReact;
import com.web.book.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
	@Query("SELECT new com.web.book.dto.BookDTOReact(b.id, b.book_name, b.book_price, b.book_quantity, b.book_lang, b.book_description, b.book_image, a.id AS author_id, a.author_name, a.author_description, c.id AS category_id, c.category_name, p.id AS publisher_id, p.publisher_name, p.publisher_description) " +
            "FROM Book b " +
            "INNER JOIN b.author a " +
            "INNER JOIN b.category c " +
            "INNER JOIN b.publisher p ")
    List<BookDTOReact> findAllBooks();
    @Query("SELECT new com.web.book.dto.BookDTOReact(b.id, b.book_name, b.book_price, b.book_quantity, b.book_lang, b.book_description, b.book_image, a.id AS author_id, a.author_name, a.author_description, c.id AS category_id, c.category_name, p.id AS publisher_id, p.publisher_name, p.publisher_description) " +
            "FROM Book b " +
            "INNER JOIN b.author a " +
            "INNER JOIN b.category c " +
            "INNER JOIN b.publisher p " +
            "WHERE b.id = :id")
     Optional<BookDTOReact> getBookById(@Param("id") Long id);
	List<Book> findByCategoryId(Long categoryId);
	List<Book> findByPublisherId(Long publisherId);
}
