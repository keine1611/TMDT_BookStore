package com.web.book.dto;

import jakarta.validation.constraints.Size;

public class UserRegistrationDto {
	private Long id;

	@Size(min = 5, max = 15, message = "Your username '${validatedValue}' must be between {min} and {max} characters long")
	private String username;
	
	@Size(min = 5, max = 30, message = "Your password '${validatedValue}' must be between {min} and {max} characters long")
	private String password;
	
	@Size(min = 10, max = 25, message = "Your email '${validatedValue}' must be between {min} and {max} characters long")
	private String email;
	
	@Size(min = 10, max = 20, message = "Your phone '${validatedValue}' must be between {min} and {max}")
	private String phone;
	
	private String address;
	
	private String avatar;
	
	@Size(min = 1, max = 10, message = "Your ROLE '${validatedValue}' must be between {min} and {max} characters long")
	private String roles = "USER";

	public UserRegistrationDto() {
	}

	public UserRegistrationDto(
			@Size(min = 5, max = 15, message = "Your username '${validatedValue}' must be between {min} and {max} characters long") String username,
			@Size(min = 5, max = 30, message = "Your password '${validatedValue}' must be between {min} and {max} characters long") String password,
			@Size(min = 10, max = 25, message = "Your email '${validatedValue}' must be between {min} and {max} characters long") String email,
			@Size(min = 10, max = 20, message = "Your phone '${validatedValue}' must be between {min} and {max}") String phone, String address, String avatar,
			@Size(min = 1, max = 10, message = "Your ROLE '${validatedValue}' must be between {min} and {max} characters long") String roles) {
		//this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.avatar = avatar;
		this.roles = roles;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	@Override
	public String toString() {
		return "UserRegistrationDto [username=" + username + ", password=" + password + ", email=" + email + ", phone="
				+ phone + ", address=" + address + ", avatar=" + avatar + ", roles=" + roles + "]";
	}
	
}
