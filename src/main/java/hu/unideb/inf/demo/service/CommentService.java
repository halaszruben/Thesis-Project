package hu.unideb.inf.demo.service;

import hu.unideb.inf.demo.dto.CommentDto;
import hu.unideb.inf.demo.entity.BookStoreTable;
import hu.unideb.inf.demo.entity.Comment;
import hu.unideb.inf.demo.entity.User;
import hu.unideb.inf.demo.repository.BookStoreTableRepository;
import hu.unideb.inf.demo.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepo;

    @Autowired
    private BookStoreTableRepository bookStoreRepo;

    public Comment save(CommentDto commentDto, User user) {
        Comment comment = new Comment();
        BookStoreTable bookStoreTable = bookStoreRepo.getById(commentDto.getTableId());

        comment.setId(commentDto.getId());
        comment.setBookStoreTable(bookStoreTable);
        comment.setText(commentDto.getText());
        comment.setCreatedBy(user);
        if (comment.getId() == null)
            comment.setCreatedDate(LocalDateTime.now());

        return commentRepo.save(comment);
    }

    public Set<Comment> getCommentsByBookStoreTableId(Long tableId) {
        Set<Comment> comments = commentRepo.findByBookStoreTableId(tableId);

        return comments;
    }

    public void delete(Long commentId) {
        commentRepo.deleteById(commentId);
    }

}
