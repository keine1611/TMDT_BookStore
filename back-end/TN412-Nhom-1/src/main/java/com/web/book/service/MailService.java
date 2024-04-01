package com.web.book.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class MailService {


	@Value("${spring.mail.username}")
	private String fromMail;
	
	@Autowired
	private JavaMailSender mailSender;
	
	public void sendMail(String mail, String subject, String message) throws MessagingException, IOException {
		MimeMessage mineMessage = mailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mineMessage, true);
		mimeMessageHelper.setFrom(fromMail);
		mimeMessageHelper.setTo(mail);

		mimeMessageHelper.setSubject(subject);
		mimeMessageHelper.setText(message, true);

		mailSender.send(mineMessage);
	}
}
