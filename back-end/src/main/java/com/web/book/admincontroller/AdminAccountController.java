package com.web.book.admincontroller;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.web.book.dto.UserRegistrationDto;
import com.web.book.entity.User;
import com.web.book.paging.CurrentPageTransporter;
import com.web.book.paging.Pager;
import com.web.book.service.UserEntityService;
import com.web.book.service.UserEntityServiceImpl;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/admin")
public class AdminAccountController {
	@Autowired
	private UserEntityService userEntityService = new UserEntityServiceImpl();
	
	private static final int INITIAL_PAGE = 0;
	
	@Autowired
	private PasswordEncoder pwEncoderAdmin;
	
	@Autowired 
	private UserEntityServiceImpl userAdminEntityServiceImpl;
	
	@GetMapping(value = {"/account"})
	public ModelAndView fetchUser(@RequestParam("page") Optional<Integer> page) {
		int evalPage = (page.orElse(0) < 1) ? INITIAL_PAGE : page.get() - 1;
		
		int currentPage = evalPage + 1;
		CurrentPageTransporter.setCurrentPage(currentPage);
		
		Sort sort = Sort.by("username").ascending();
		Page<User> users = userEntityService.findAllAccountsPageable(PageRequest.of(evalPage, 5, sort));
		
		Pager pager = new Pager(users);
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("users", users);
		modelAndView.addObject("pager", pager);
		modelAndView.setViewName("/admin/adminaccount");
		
		return modelAndView;
	}
	
	@GetMapping("/account/adduser")
	public String adminRegistration(Model model) {
		UserRegistrationDto userRegistrationDto = new UserRegistrationDto();
		model.addAttribute("userAdminView", userRegistrationDto);
		
		return "/admin/account/adminnew";
	}
	
	@PostMapping("/account/adduser")
	public ModelAndView adminAccountAddUser(@ModelAttribute("userAdminView") @Valid UserRegistrationDto userRegistrationDto,@RequestParam("image_user") String image , BindingResult bindingResult) throws IOException {
		if (userAdminEntityServiceImpl.findByEmail(userRegistrationDto.getEmail()).isPresent()) {
			bindingResult.rejectValue("email", "error.user", "The email is already registered, please us another one.");
		}
		
		if (userAdminEntityServiceImpl.findByUsername(userRegistrationDto.getUsername()).isPresent()) {
			bindingResult.rejectValue("username", "error.user", "There is already a user registered with the username provided");
		}
		
		if (userAdminEntityServiceImpl.findByPhone(userRegistrationDto.getPhone()).isPresent()) {
			bindingResult.rejectValue("phone", "error.user", "Please provide your phone number");
		}
		
		ModelAndView modelAndView = new ModelAndView();
		
		if (bindingResult.hasErrors()) {
			modelAndView.setViewName("/admin/account/adminnew");
			return modelAndView;
		}
		else {
			User user = new User();
			user.setUsername(userRegistrationDto.getUsername());
			user.setEmail(userRegistrationDto.getEmail());
			user.setPassword(userRegistrationDto.getPassword());
			user.setAddress(userRegistrationDto.getAddress());
			user.setPhone(userRegistrationDto.getPhone());
			user.setAvatar(image);
			user.setRole(userRegistrationDto.getRoles());
			
			userAdminEntityServiceImpl.createNewUserEntity(user);
			
			//modelAndView.addObject("successMessage", "Username, '" + user.getUsername() + "' has been registered successfully. Now you should login for shopping.");
			
			modelAndView.addObject("username", userRegistrationDto);
			
			modelAndView.setViewName("redirect:/admin/account");
		}
		return modelAndView;
	}
	
	@PostMapping("/account/saveUser")
	public String saveUser(@ModelAttribute("user") User user) {
		user.setPassword(pwEncoderAdmin.encode(user.getPassword()));
		userEntityService.saveUser(user);
		return "redirect:/admin/account";
	}
	
	@GetMapping(value = {"/account/edit/{id}"})
	public String adminAccountEdit(Model model, @PathVariable (value = "id") Long id) {
		User user = userEntityService.findUserById(id).orElseThrow(() -> new IllegalArgumentException("User Not Found"));
		model.addAttribute("user", user);
		return "/admin/account/adminedit";
	}
	
	@GetMapping(value = {"/account/delete/{id}"})
	public String adminAccountDelete(@PathVariable (value = "id") Long id) {
		this.userEntityService.deleteUserById(id);
		return "redirect:/admin/account";
	}
}
