package com.pfe.product.controller;

import com.pfe.product.model.Product;
import com.pfe.product.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import com.pfe.product.service.ProductImportService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductImportService importService;

    @Autowired
    public ProductController(ProductRepository productRepository, ProductImportService importService) {
        this.productRepository = productRepository;
        this.importService = importService;
    }

    @PostMapping("/import")
    public String importProducts(@RequestParam("file") MultipartFile file) {
        try {
            if (file.getOriginalFilename().endsWith(".csv")) {
                importService.importFromCsv(file);
            } else {
                importService.importFromExcel(file);
            }
            return "Import successful!";
        } catch (Exception e) {
            return "Import failed: " + e.getMessage();
        }
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/recommendations")
    public List<Product> getRecommendations(@RequestParam("goal") String goal) {
        List<Product> all = productRepository.findAll();
        // Simple logic: if goal is weight loss, filter for low calorie
        if ("perte de poids".equalsIgnoreCase(goal) || "Weight Loss".equalsIgnoreCase(goal)) {
            return all.stream()
                .filter(p -> p.getInformationsNutritionnelles() != null && p.getInformationsNutritionnelles().getCalories() < 300)
                .toList();
        }
        // If goal is muscle gain, filter for high protein
        if ("prise de masse".equalsIgnoreCase(goal) || "Muscle Gain".equalsIgnoreCase(goal)) {
            return all.stream()
                .filter(p -> p.getInformationsNutritionnelles() != null && p.getInformationsNutritionnelles().getProteines() > 15)
                .sorted((p1, p2) -> Float.compare(p2.getInformationsNutritionnelles().getProteines(), p1.getInformationsNutritionnelles().getProteines()))
                .toList();
        }
        return all;
    }
}
