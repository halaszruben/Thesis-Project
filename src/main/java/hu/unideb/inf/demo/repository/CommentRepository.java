package hu.unideb.inf.demo.repository;

import hu.unideb.inf.demo.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from Comment c "
            + " where c.bookStoreTable.id = :tableId")
    Set<Comment> findByBookStoreTableId(Long tableId);
}
