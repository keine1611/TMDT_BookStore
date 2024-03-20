package com.web.book.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.book.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsernameAndPassword(String username, String password);
	boolean existsByUsername(String username);
	boolean existsByEmail(String email);
}
