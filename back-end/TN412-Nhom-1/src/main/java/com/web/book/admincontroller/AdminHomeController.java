package com.web.book.admincontroller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/admin")
public class AdminHomeController {
	
	@GetMapping("/template")
	private String getTemplate() {
		return "/admin/admintemplate";
	}
	@GetMapping("/templatehome")
	private String home() {
		return "/admin/templatehome";
	}
//	@Autowired
//	private UserEntityService userEntityService = new UserEntityServiceImpl();
//	
////	@GetMapping("/admin/home")
////	public String index(Model model, RedirectAttributes redirect) {
////		//model.addAttribute("users", userEntityService.findAll());
////		//redirect.addFlashAttribute("success", "");
////		return "/admin/adminhome";
////	}
//	
//	private static final int INITIAL_PAGE = 0;
//	
//	@Autowired
//	private PasswordEncoder pwEncoderAdmin;
//	
//	@Autowired 
//	private UserEntityServiceImpl userEntityServiceImpl;
//	
//	@GetMapping(value = {"/account"})
//	public ModelAndView fetchUser(@RequestParam("page") Optional<Integer> page) {
//		int evalPage = (page.orElse(0) < 1) ? INITIAL_PAGE : page.get() - 1;
//		
//		int currentPage = evalPage + 1;
//		CurrentPageTransporter.setCurrentPage(currentPage);
//		System.out.println("-----------------SET qs CurrentPage------ = " + currentPage);
//		
//		Sort sort = Sort.by("username").ascending();
//		Page<User> users = userEntityService.findAllAccountsPageable(PageRequest.of(evalPage, 5, sort));
//		
//		Pager pager = new Pager(users);
//		
//		ModelAndView modelAndView = new ModelAndView();
//		modelAndView.addObject("users", users);
//		modelAndView.addObject("pager", pager);
//		modelAndView.setViewName("/admin/adminaccount");
//		
//		return modelAndView;
//	}
//	
////	@PostMapping("/account/adduser")
////	public ModelAndView adminAccountAddUser(@ModelAttribute("addUserView") @Valid UserRegistrationDto userRegistrationDto) {
////		ModelAndView modelAndView = new ModelAndView();
////		User user = new User();
////		user.setUsername(userRegistrationDto.getUsername());
////		user.setEmail(userRegistrationDto.getEmail());
////		user.setPassword(userRegistrationDto.getPassword());
////		user.setAddress(userRegistrationDto.getAddress());
////		user.setPhone(userRegistrationDto.getPhone());
////		user.setRole(userRegistrationDto.getRoles());
////		
////		userEntityServiceImpl.createNewUserEntity(user);
////		
////		modelAndView.addObject("successMessage", "Username, '" + user.getUsername() + "' has been registered successfully. Now you should login for shopping.");
////		
////		modelAndView.addObject("username", userRegistrationDto);
////		
////		modelAndView.setViewName("/admin/account/adminnew");
////		
////		return modelAndView;
////	}
//	
//	@PostMapping("/account/saveUser")
//	public String saveUser(@ModelAttribute("user") User user) {
//		user.setPassword(pwEncoderAdmin.encode(user.getPassword()));
//		userEntityService.saveUser(user);
//		return "redirect:/admin/home";
//	}
//	
//	@GetMapping(value = {"/account/edit/{id}"})
//	public String adminAccountEdit(Model model, @PathVariable (value = "id") Long id) {
//		Optional<User> user = userEntityService.findUserById(id);
//		model.addAttribute("user", user);
//		return "/admin/account/adminedit";
//	}
}
