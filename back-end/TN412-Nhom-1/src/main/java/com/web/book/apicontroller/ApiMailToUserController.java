package com.web.book.apicontroller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.book.entity.User;
import com.web.book.repository.UserRepository;
import com.web.book.service.MailService;

import jakarta.mail.MessagingException;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/mail")
public class ApiMailToUserController {

	@Autowired
	private MailService mailService;
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping
	public String mail( 
			@RequestParam String subject,
			@RequestParam String message,
			@RequestParam String email) throws MessagingException, IOException {
		mailService.sendMail(email, subject, message);
		return "Send mail successfully";
	}
	
}
