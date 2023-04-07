package hu.unideb.inf.demo.service;

import java.util.Set;

import hu.unideb.inf.demo.dto.BeverageAndPastryDto;
import hu.unideb.inf.demo.entity.BeverageAndPastry;
import hu.unideb.inf.demo.entity.BookStore;
import hu.unideb.inf.demo.entity.User;
import hu.unideb.inf.demo.repository.BeverageAndPastryRepository;
import hu.unideb.inf.demo.repository.BookStoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BeverageAndPastryService {

    @Autowired
    private BookStoreRepository bookStoreRepository;
    @Autowired
    private BeverageAndPastryRepository bevAndPastRepo;

    public BeverageAndPastry save(BeverageAndPastryDto bevAndPastDto, User user) {

        BeverageAndPastry bevAndPast = new BeverageAndPastry();

        BookStore bookStore = bookStoreRepository.getReferenceById(bevAndPastDto.getBookstoreId());

        bevAndPast.setId(bevAndPastDto.getId());
        bevAndPast.setBookStore(bookStore);
        bevAndPast.setName(bevAndPastDto.getName());
        bevAndPast.setCosts(bevAndPastDto.getCosts());
        bevAndPast.setType(bevAndPastDto.getType());

        return bevAndPastRepo.save(bevAndPast);
    }

    public Set<BeverageAndPastry> getBevAndPast(Long bookstoreId) {
        Set<BeverageAndPastry> bevAndPastries = bevAndPastRepo.findByBookStore(bookstoreId);

        return bevAndPastries;
    }

    public void delete(Long bevAndPastId) {
        bevAndPastRepo.deleteById(bevAndPastId);
    }
}
