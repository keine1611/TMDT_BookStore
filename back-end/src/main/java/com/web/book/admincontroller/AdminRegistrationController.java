package com.web.book.admincontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import com.web.book.dto.UserRegistrationDto;
import com.web.book.entity.User;
import com.web.book.service.UserEntityServiceImpl;

import jakarta.validation.Valid;

@Controller
public class AdminRegistrationController {
	@Autowired 
	private UserEntityServiceImpl userEntityServiceImpl;
	
	@GetMapping("/admin/register")
	public String registration(Model model) {
		UserRegistrationDto userRegistrationDto = new UserRegistrationDto();
		model.addAttribute("userView", userRegistrationDto);
		
		return "/admin/adminregister";
	}
	
	@PostMapping("/admin/register")
	public ModelAndView createNewUser(@ModelAttribute("userView") @Valid UserRegistrationDto userRegistrationDto, BindingResult bindingResult) {
		if (userEntityServiceImpl.findByEmail(userRegistrationDto.getEmail()).isPresent()) {
			bindingResult.rejectValue("email", "error.user", "The email is already registered, please us another one.");
		}
		
		if (userEntityServiceImpl.findByUsername(userRegistrationDto.getUsername()).isPresent()) {
			bindingResult.rejectValue("username", "error.user", "There is already a user registered with the username provided");
		}
		
		ModelAndView modelAndView = new ModelAndView();
		
		if (bindingResult.hasErrors()) {
			modelAndView.setViewName("/admin/adminregister");
			return modelAndView;
		}
		else {
			User user = new User();
			user.setUsername(userRegistrationDto.getUsername());
			user.setEmail(userRegistrationDto.getEmail());
			user.setPassword(userRegistrationDto.getPassword());
			
			userEntityServiceImpl.createNewUserEntity(user);
			
			modelAndView.addObject("successMessage", "Username, '" + user.getUsername() + "' has been registered successfully. Now you should login for shopping.");
			
			modelAndView.addObject("username", userRegistrationDto);
			
			modelAndView.setViewName("/admin/adminlogin");
		}
		return modelAndView;
	}
}
