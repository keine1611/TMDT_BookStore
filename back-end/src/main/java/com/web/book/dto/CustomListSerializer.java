package com.web.book.dto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.web.book.entity.Book;

public class CustomListSerializer extends StdSerializer<List<Book>> {
	public CustomListSerializer() {
		this(null);
	}

	public CustomListSerializer(Class<List<Book>> t) {
		super(t);
	}
	
	@Override
    public void serialize(
            List<Book> books,
            JsonGenerator generator,
            SerializerProvider provider)
            throws IOException, JsonProcessingException {
        List<Long> ids = new ArrayList<>();
        for (Book book : books) {
            ids.add(book.getId());
        }
        generator.writeObject(ids);
    }
}
