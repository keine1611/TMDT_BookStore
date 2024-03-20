package com.web.book.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.web.book.entity.Author;


public interface AuthorRepository extends JpaRepository<Author, Long> {
}
