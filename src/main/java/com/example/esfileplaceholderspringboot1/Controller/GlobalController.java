package com.example.esfileplaceholderspringboot1.Controller;

import com.example.esfileplaceholderspringboot1.Model.Mouse;
import com.example.esfileplaceholderspringboot1.Service.GlobalService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class GlobalController {

    final GlobalService GlobalService;

    public GlobalController(GlobalService GlobalService) {
        this.GlobalService = GlobalService;
    }

    @GetMapping("/getAllMice")
    public List<Mouse> getAllmice(HttpServletResponse response) throws IOException {
        List<Mouse> mouseList = GlobalService.getAllMice();
        if (mouseList == null) {
            response.sendError(HttpStatus.NOT_FOUND.value());
        }
        return mouseList;
    }

    @GetMapping("/getDistinctBrands")
    public List<Mouse> getDistinctBrands(HttpServletResponse response) throws IOException {
        List<Mouse> brandList = GlobalService.getDistinctBrands();
        if (brandList == null) {
            response.sendError(HttpStatus.NOT_FOUND.value());
        }
        return brandList;
    }

    @GetMapping("/getDistinctCategoryItems")
    public List<Mouse> getDistinctCategoryItems(String category, HttpServletResponse response) throws IOException {
        List<Mouse> distinctCategoryItems = GlobalService.getDistinctCategoryItems(category);
        if (distinctCategoryItems == null) {
            response.sendError(HttpStatus.NOT_FOUND.value());
        }
        return distinctCategoryItems;
    }
}
