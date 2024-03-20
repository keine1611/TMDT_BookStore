package com.web.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.book.entity.Publisher;


public interface PublisherRepository extends JpaRepository<Publisher, Long> {

}
