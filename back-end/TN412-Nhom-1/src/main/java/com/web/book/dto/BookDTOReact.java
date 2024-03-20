package com.web.book.dto;

public class BookDTOReact {
	private Long id;

	private String book_name;

	private Integer book_price;

	private int book_quantity;
	
	private String book_lang;
	
	private String book_description;
	
    private String book_image;
    
    private AuthorDTOReact author;
    
    private CategoryDTOReact category;
    
    private PublisherDTO publisher;
    
    public BookDTOReact(Long id, String book_name, Integer book_price, int book_quantity, String book_lang,
			String book_description,String book_image, Long author_id, String author_name, String author_description, Long category_id, String category_name, Long publisher_id, String publisher_name, String publisher_description) {
		super();
		this.id = id;
		this.book_name = book_name;
		this.book_price = book_price;
		this.book_quantity = book_quantity;
		this.book_lang = book_lang;
		this.book_description = book_description;
		this.book_image = book_image;
		this.author = new AuthorDTOReact();
		this.author.setId(author_id);
		this.author.setAuthor_name(author_name);
		this.author.setAuthor_description(author_description);
		this.category = new CategoryDTOReact();
		this.category.setId(category_id);
		this.category.setCategory_name(category_name);
		this.publisher = new PublisherDTO();
		this.publisher.setId(publisher_id);
		this.publisher.setPublisher_description(publisher_description);
		this.publisher.setPublisher_name(publisher_name);
    }
    
    
    

	public PublisherDTO getPublisher() {
		return publisher;
	}




	public void setPublisher(PublisherDTO publisher) {
		this.publisher = publisher;
	}




	public BookDTOReact() {
		super();
	}




	public CategoryDTOReact getCategory() {
		return category;
	}


	public void setCategory(CategoryDTOReact category) {
		this.category = category;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBook_name() {
		return book_name;
	}

	public void setBook_name(String book_name) {
		this.book_name = book_name;
	}

	public Integer getBook_price() {
		return book_price;
	}

	public void setBook_price(Integer book_price) {
		this.book_price = book_price;
	}

	public int getBook_quantity() {
		return book_quantity;
	}

	public void setBook_quantity(int book_quantity) {
		this.book_quantity = book_quantity;
	}

	public String getBook_lang() {
		return book_lang;
	}

	public void setBook_lang(String book_lang) {
		this.book_lang = book_lang;
	}

	public String getBook_description() {
		return book_description;
	}

	public void setBook_description(String book_description) {
		this.book_description = book_description;
	}

	public String getBook_image() {
		return book_image;
	}

	public void setBook_image(String book_image) {
		this.book_image = book_image;
	}

	public AuthorDTOReact getAuthor() {
		return author;
	}

	public void setAuthor(AuthorDTOReact author) {
		this.author = author;
	}

	
	
	
}

class AuthorDTOReact {
	private Long id;
	private String author_name;
	private String author_description;
	
	public AuthorDTOReact(Long id, String author_name, String author_description) {
		super();
		this.id = id;
		this.author_name = author_name;
		this.author_description = author_description;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAuthor_name() {
		return author_name;
	}

	public void setAuthor_name(String author_name) {
		this.author_name = author_name;
	}

	public String getAuthor_description() {
		return author_description;
	}

	public void setAuthor_description(String author_description) {
		this.author_description = author_description;
	}

	public AuthorDTOReact() {
		super();
	}
	
}

class CategoryDTOReact {
	private Long id;
	private String category_name;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCategory_name() {
		return category_name;
	}
	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	public CategoryDTOReact(Long id, String category_name) {
		super();
		this.id = id;
		this.category_name = category_name;
	}
	public CategoryDTOReact() {
		super();
	}
	
}
class PublisherDTO{
	private Long id;
	private String publisher_name;
	private String publisher_description;
	
	public PublisherDTO(Long id, String publisher_name, String publisher_description) {
		super();
		this.id = id;
		this.publisher_name = publisher_name;
		this.publisher_description = publisher_description;
	}

	public PublisherDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPublisher_name() {
		return publisher_name;
	}

	public void setPublisher_name(String publisher_name) {
		this.publisher_name = publisher_name;
	}

	public String getPublisher_description() {
		return publisher_description;
	}

	public void setPublisher_description(String publisher_description) {
		this.publisher_description = publisher_description;
	}	
}
