package com.web.book.admincontroller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.web.book.entity.Book;
import com.web.book.entity.Category;
import com.web.book.repository.BookRepository;
import com.web.book.repository.CategoryRepository;



@Controller
@RequestMapping("/admin")
public class AdminCategoryController {
	
	@Autowired
	private CategoryRepository categoryRepos;
	
	@Autowired
	private BookRepository bookRepos;
	
	@GetMapping("/category/list-categories")
	public String listCategory(Model model) {
		List<Category> listcategories = categoryRepos.findAll();
		model.addAttribute("categorys",listcategories);
		return "/admin/category/listcategory";
	}
	
//	@GetMapping("/category/add-category")
//	public String addCategory(Model model) {
//		Category newcategory = new Category();
//	    model.addAttribute("category", newcategory);
//	    return "/admin/category/addcategory";
//	}
	
	@PostMapping("/category/add")
	public String addCategory(Category category, Model model) {
		categoryRepos.save(category);
	    return "redirect:/admin/category/list-categories";
	}
	
//	@GetMapping("/category/edit/{id}")
//	public String editCategory(@PathVariable("id") Long id, Model model) {
//	    Category category = categoryRepos.findById(id).orElseThrow(() -> new IllegalArgumentException("Category not found!"));
//	    model.addAttribute("editcategory", category);
//	    return "admin/category/editcategory";
//	}
//	
	@PostMapping("/category/edit/{id}")
	public String editCategory(@PathVariable("id") Long id, @RequestParam("category_name") String categoryName, Model model) {
	    Category editCategory = categoryRepos.findById(id).orElseThrow(() -> new IllegalArgumentException("Category not found!"));
	    editCategory.setCategory_name(categoryName);
	    categoryRepos.save(editCategory);
	    return "redirect:/admin/category/list-categories";
	}
	
//	@PostMapping("/category/delete/{id}")
//	public ResponseEntity<String> deleteCategory(@PathVariable("id") Long id) {
//		// Xóa tất cả các sách thuộc danh mục
//	    List<Book> books = bookRepos.findByCategoryId(id);
//	    bookRepos.deleteAll(books);
//	 // Xóa danh mục
//	    categoryRepos.deleteById(id);
//	    return new ResponseEntity<>("Category and its books deleted successfully", HttpStatus.OK);
//	}
	
	@PostMapping("/category/delete/{id}")
	public String deleteCategory(@PathVariable("id") Long id) {
	    categoryRepos.deleteById(id);
	    return "redirect:/admin/category/list-categories";
	}
	
}
