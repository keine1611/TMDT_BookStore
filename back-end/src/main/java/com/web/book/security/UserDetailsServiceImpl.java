package com.web.book.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.book.repository.UserEntityRepository;



@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private UserEntityRepository userEntityRepository;
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		com.web.book.entity.User userEntity = userEntityRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Email " + username + "not found"));
		return new User(userEntity.getUsername(), userEntity.getPassword(), getAuthorities(userEntity));
	}

	private Collection<? extends GrantedAuthority> getAuthorities(com.web.book.entity.User userEntity) {
		Collection<SimpleGrantedAuthority> authorities = new ArrayList();
		return authorities;
	}

}
