package hu.unideb.inf.demo.controller;

import java.util.Set;

import hu.unideb.inf.demo.dto.BeverageAndPastryDto;
import hu.unideb.inf.demo.entity.BeverageAndPastry;
import hu.unideb.inf.demo.entity.User;
import hu.unideb.inf.demo.service.BeverageAndPastryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bevsAndPasties")
public class BeverageAndPastryController {

    @Autowired
    private BeverageAndPastryService bevAndPastService;

    @PostMapping("")
    public ResponseEntity<BeverageAndPastry> createBevAndPastry(@RequestBody BeverageAndPastryDto bevAndPastDto,
            @AuthenticationPrincipal User user) {
        BeverageAndPastry bevAndPast = bevAndPastService.save(bevAndPastDto, user);

        return ResponseEntity.ok(bevAndPast);
    }

    @GetMapping("")
    public ResponseEntity<Set<BeverageAndPastry>> getBevAndPast(@RequestParam Long bookstoreId) {
        Set<BeverageAndPastry> bevAndPast = bevAndPastService.getBevAndPast(bookstoreId);

        return ResponseEntity.ok(bevAndPast);
    }

    @DeleteMapping("{bevAndPastId}")
    public ResponseEntity<?> deleteBevAndPast(@PathVariable Long bevAndPastId) {
        try {
            bevAndPastService.delete(bevAndPastId);
            return ResponseEntity.ok("The Beverage/Pastry has been deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("{bevAndPastId}")
    public ResponseEntity<BeverageAndPastry> updateBevAndPast(@RequestBody BeverageAndPastryDto bevAndPastDto,
            @AuthenticationPrincipal User user) {
        BeverageAndPastry bevAndPast = bevAndPastService.save(bevAndPastDto, user);

        return ResponseEntity.ok(bevAndPast);
    }
}
