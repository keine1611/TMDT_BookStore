package com.web.book.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.web.book.entity.User;
import com.web.book.repository.UserEntityRepository;


@Service
public class UserEntityServiceImpl implements UserEntityService {
	@Autowired
	private UserEntityRepository userEntityRepository;
	
	@Autowired
	private PasswordEncoder pwEncoder;
	
	
	@Override
	public Optional<User> findUserById(Long id) {
		return userEntityRepository.findById(id);
	}
	
	@Override
	public void saveUser(User user) {
		this.userEntityRepository.save(user);
		
	}
	
	@Override
	public Page<User> findAllAccountsPageable(Pageable pageable) {
		return userEntityRepository.findAll(pageable);
	}
	
	@Override
	public Optional<User> findByUsername(String username) {
		return userEntityRepository.findByUsername(username);
	}
	
	@Override
	public Optional<User> findByEmail(String email) {
		return userEntityRepository.findByEmail(email);
	}
	
	@Override
	public void createNewUserEntity(User user) {
		user.setPassword(pwEncoder.encode(user.getPassword()));
		userEntityRepository.save(user);
	}

	@Override
	public void deleteUserById(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Optional<User> findByPhone(String phone) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

	@Override
	public List<User> searchUser(String keyName) {
		// TODO Auto-generated method stub
		return null;
	}
}
