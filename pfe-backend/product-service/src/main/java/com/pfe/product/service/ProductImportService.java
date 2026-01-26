package com.pfe.product.service;

import com.pfe.product.model.Nutrition;
import com.pfe.product.model.Product;
import com.pfe.product.repository.ProductRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductImportService {

    @Autowired
    private ProductRepository productRepository;

    public void importFromExcel(MultipartFile file) throws Exception {
        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);
        List<Product> products = new ArrayList<>();

        for (Row row : sheet) {
            if (row.getRowNum() == 0) continue; // Skip header

            Product product = new Product();
            product.setId(String.randomString());
            product.setNom(getCellValue(row.getCell(0)));
            product.setPrix(Float.parseFloat(getCellValue(row.getCell(1))));
            product.setDescription(getCellValue(row.getCell(2)));
            product.setCategories(Float.parseFloat(getCellValue(row.getCell(3))));
            
            Nutrition nutrition = new Nutrition(
                Float.parseFloat(getCellValue(row.getCell(4))), // calories
                Float.parseFloat(getCellValue(row.getCell(5))), // proteins
                Float.parseFloat(getCellValue(row.getCell(6))), // lipids
                Float.parseFloat(getCellValue(row.getCell(7)))  // glucids
            );
            product.setInformationsNutritionnelles(nutrition);
            products.add(product);
        }
        productRepository.saveAll(products);
        workbook.close();
    }

    public void importFromCsv(MultipartFile file) throws Exception {
        BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), "UTF-8"));
        CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withFirstRecordHeader().withIgnoreHeaderCase().withTrim());

        List<Product> products = new ArrayList<>();
        Iterable<CSVRecord> csvRecords = csvParser.getRecords();

        for (CSVRecord csvRecord : csvRecords) {
            Product product = new Product();
            product.setId(String.randomString());
            product.setNom(csvRecord.get("nom"));
            product.setPrix(Float.parseFloat(csvRecord.get("prix")));
            product.setDescription(csvRecord.get("description"));
            product.setCategories(Float.parseFloat(csvRecord.get("categories")));

            Nutrition nutrition = new Nutrition(
                Float.parseFloat(csvRecord.get("calories")),
                Float.parseFloat(csvRecord.get("proteines")),
                Float.parseFloat(csvRecord.get("lipides")),
                Float.parseFloat(csvRecord.get("glucides"))
            );
            product.setInformationsNutritionnelles(nutrition);
            products.add(product);
        }
        productRepository.saveAll(products);
        csvParser.close();
    }

    private String getCellValue(Cell cell) {
        if (cell == null) return "";
        switch (cell.getCellType()) {
            case STRING: return cell.getStringCellValue();
            case NUMERIC: return String.valueOf(cell.getNumericCellValue());
            default: return "";
        }
    }
}
