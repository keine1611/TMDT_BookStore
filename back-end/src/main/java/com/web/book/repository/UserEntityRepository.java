package com.web.book.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.web.book.entity.User;


public interface UserEntityRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
	Optional<User> findByUsername(String username);
	Optional<User> findByPhone(String phone);
	Optional<User> findByRole(String role);
	
	@Modifying
	@Query(value = "SELECT u FROM User u WHERE u.username LIKE %1%", nativeQuery = true)
	List<User> searchUser(String username);
}
