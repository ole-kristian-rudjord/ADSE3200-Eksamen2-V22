package com.example.esfileplaceholderspringboot1.CompareShapes.Controller;

import com.example.esfileplaceholderspringboot1.Global.Model.Mouse;
import com.example.esfileplaceholderspringboot1.CompareShapes.Service.CompareShapesService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/CompareShapes")
public class CompareShapesController {

    final CompareShapesService CompareShapesService;

    public CompareShapesController(CompareShapesService CompareShapesService) {
        this.CompareShapesService = CompareShapesService;
    }

    @GetMapping("/getMouse")
    public Mouse getMouse(/*String brand, String model */Mouse mouse, HttpServletResponse response) throws IOException {
        Mouse returningMouse = CompareShapesService.getMouse(/*brand, model */mouse);
        if (returningMouse == null) {
            response.sendError(HttpStatus.NOT_FOUND.value());
        }
        return returningMouse;
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
