package com.example.esfileplaceholderspringboot1.Controller;

import com.example.esfileplaceholderspringboot1.Model.Mouse;
import com.example.esfileplaceholderspringboot1.Service.CompareShapesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class CompareShapesController {

    @Autowired
    CompareShapesService CompareShapesService;

    @GetMapping("/getMouse")
    public Mouse getMouse(Mouse mouse, HttpServletResponse response) throws IOException {
        Mouse returningMouse = CompareShapesService.getMouse(mouse);
        if (returningMouse == null) {
            response.sendError(HttpStatus.NOT_FOUND.value());
        }
        return returningMouse;
    }

    @GetMapping("/getDistinctBrands")
    public List<Mouse> getDistinctBrands(HttpServletResponse response) throws IOException {
        List<Mouse> brandList = CompareShapesService.getDistinctBrands();
        if (brandList == null) {
            response.sendError(HttpStatus.NOT_FOUND.value());
        }
        return brandList;
    }

    @GetMapping("/getMatchingModels")
    public List<Mouse> getMatchingModels(Mouse brand, HttpServletResponse response) throws IOException {
        List<Mouse> modelList = CompareShapesService.getMatchingModels(brand);
        if (modelList == null) {
            response.sendError(HttpStatus.NOT_FOUND.value());
        }
        return modelList;
    }
}
