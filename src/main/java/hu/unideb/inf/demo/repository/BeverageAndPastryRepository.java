package hu.unideb.inf.demo.repository;

import java.util.Set;

import hu.unideb.inf.demo.entity.BeverageAndPastry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BeverageAndPastryRepository extends JpaRepository<BeverageAndPastry, Long> {

    @Query("select bp from BeverageAndPastry bp " +
            "where bp.bookStore.id = :bookstoreId")
    Set<BeverageAndPastry> findByBookStore(Long bookstoreId);
}
