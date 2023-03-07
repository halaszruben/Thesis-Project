package hu.unideb.inf.demo.controller;

import hu.unideb.inf.demo.dto.CommentDto;
import hu.unideb.inf.demo.entity.Comment;
import hu.unideb.inf.demo.entity.User;
import hu.unideb.inf.demo.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("")
    public ResponseEntity<Comment> createComment(@RequestBody CommentDto commentDto,
                                                 @AuthenticationPrincipal User user) {
        Comment comment = commentService.save(commentDto, user);

        return ResponseEntity.ok(comment);
    }

    @GetMapping("")
    public ResponseEntity<Set<Comment>> getCommentsByBookStoreTable(@RequestParam Long tableId) {
        Set<Comment> comments = commentService.getCommentsByBookStoreTableId(tableId);

        return ResponseEntity.ok(comments);
    }

    @PutMapping("{commentId}")
    public ResponseEntity<Comment> updateComment(@RequestBody CommentDto commentDto,
                                                 @AuthenticationPrincipal User user) {
        Comment comment = commentService.save(commentDto, user);

        return ResponseEntity.ok(comment);
    }

    @DeleteMapping("{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        try {
            commentService.delete(commentId);
            return ResponseEntity.ok("Comment Deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
