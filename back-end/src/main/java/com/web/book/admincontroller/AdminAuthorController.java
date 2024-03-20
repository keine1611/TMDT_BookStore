package com.web.book.admincontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.web.book.entity.Author;
import com.web.book.repository.AuthorRepository;



@Controller
@RequestMapping("/admin")
public class AdminAuthorController {
	
	@Autowired
	private AuthorRepository authorRepos;
	
	@GetMapping("/author/list-authors")
	public String getAllAuthors(Model model) {
		List<Author> listauthors = authorRepos.findAll();
		model.addAttribute("authors",listauthors);
		return "/admin/author/listauthors";
	}
	
	@PostMapping("/author/add-author")
	public String addAuthor(@RequestParam("author_name") String name, 
			@RequestParam("author_description") String description, Model model) {
		Author addAuthor = new Author();
		addAuthor.setAuthor_name(name);
		addAuthor.setAuthor_description(description);
		authorRepos.save(addAuthor);
//		List<Author> listAuthors = authorRepos.findAll();
//		model.addAttribute("authors",listAuthors);
		return "redirect:/admin/author/list-authors";
	}
	
	@PostMapping("/author/delete/{id}")
	public String deleteAuthor(@PathVariable("id") Long author_id) {
		Author deleteAuthor = authorRepos.findById(author_id).orElseThrow(() -> new IllegalArgumentException("Author Not Found"));
		authorRepos.delete(deleteAuthor);
		return "redirect:/admin/author/list-authors";
	}
	
	@GetMapping("/author/edit-author/{id}")
	public String editAuthor(@PathVariable("id") Long author_id, Model model) {
		//System.out.println(author_id);
		Author editAuthor = authorRepos.findById(author_id).orElseThrow(() -> new IllegalArgumentException("Author Not Found"));
		model.addAttribute("editauthor",editAuthor);
		return "/admin/author/editauthor";
	}
	
	@PostMapping("/author/edit-author/{id}")
	public String saveEditAuthor(@PathVariable("id") Long author_id,
			@RequestParam("author_name") String name, 
			@RequestParam("author_description") String description,
			Model model) {
		//System.out.println(author_id);
		Author editAuthor = authorRepos.findById(author_id).orElseThrow(() -> new IllegalArgumentException("Author Not Found"));
		editAuthor.setAuthor_name(name);
		editAuthor.setAuthor_description(description);
		authorRepos.save(editAuthor);
		List<Author> listauthors = authorRepos.findAll();
		model.addAttribute("authors",listauthors);
		return "/admin/author/listauthors";
	}
	
	
	
}
