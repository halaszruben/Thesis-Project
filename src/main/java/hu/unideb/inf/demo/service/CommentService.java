package hu.unideb.inf.demo.service;

import java.time.ZonedDateTime;
import java.util.Set;

import hu.unideb.inf.demo.dto.CommentDto;
import hu.unideb.inf.demo.entity.BookStoreTable;
import hu.unideb.inf.demo.entity.Comment;
import hu.unideb.inf.demo.entity.User;
import hu.unideb.inf.demo.repository.BookStoreTableRepository;
import hu.unideb.inf.demo.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            comment.setCreatedDate(ZonedDateTime.now());
        else
            comment.setCreatedDate(commentDto.getCreatedDate());

        return commentRepo.save(comment);
    }

    public Set<Comment> getCommentsByBookStoreTableId(Long tableId) {
        Set<Comment> comments = commentRepo.findByBookStoreTableId(tableId);

        return comments;
    }

    public void delete(Long commentId) {
        commentRepo.deleteById(commentId);
    }

    public void deleteAll() {
        commentRepo.deleteAll();
    }

}
