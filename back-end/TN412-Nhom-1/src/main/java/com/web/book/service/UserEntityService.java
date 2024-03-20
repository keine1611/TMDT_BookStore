package com.web.book.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.web.book.entity.User;

public interface UserEntityService {
	Optional<User> findUserById(Long id);
	
	void deleteUserById(Long id);
	
	void saveUser(User user);
	
	Page<User> findAllAccountsPageable(Pageable pageable);
	
	Optional<User> findByUsername(String username);

	Optional<User> findByEmail(String email);
	
	Optional<User> findByPhone(String phone);

	void createNewUserEntity(User userEntity);
	
	List<User> searchUser(String keyName);
}
