package hu.unideb.inf.demo.repository;

import hu.unideb.inf.demo.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
}
