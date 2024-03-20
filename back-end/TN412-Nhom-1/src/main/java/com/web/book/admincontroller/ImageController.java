package com.web.book.admincontroller;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImageController {
	private static final String IMAGES_BOOK_DIR = "src/main/resources/static/images/books/";
	private static final String IMAGES_AVATAR_DIR = "src/main/resources/static/images/avatars/";

    @GetMapping("/bookImages/{imageName}")
    public ResponseEntity<Resource> getBookImage(@PathVariable String imageName) throws IOException {
        Path imagePath = Paths.get(IMAGES_BOOK_DIR).resolve(imageName);
        Resource resource = new UrlResource(imagePath.toUri());
        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.maxAge(30, TimeUnit.DAYS))
                .body(resource);
    }
    
    @GetMapping("/avatarImages/{imageName}")
    public ResponseEntity<Resource> getAvatarImage(@PathVariable String imageName) throws IOException {
        Path imagePath = Paths.get(IMAGES_AVATAR_DIR).resolve(imageName);
        Resource resource = new UrlResource(imagePath.toUri());
        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.maxAge(30, TimeUnit.DAYS))
                .body(resource);
    }
}
