package com.web.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.book.entity.Category;


public interface CategoryRepository extends JpaRepository<Category, Long> {

}
