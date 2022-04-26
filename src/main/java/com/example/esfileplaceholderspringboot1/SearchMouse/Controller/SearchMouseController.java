package com.example.esfileplaceholderspringboot1.SearchMouse.Controller;

import com.example.esfileplaceholderspringboot1.SearchMouse.Model.SliderValuesMax;
import com.example.esfileplaceholderspringboot1.SearchMouse.Service.SearchMouseService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/SearchMouse")
public class SearchMouseController {

    final SearchMouseService SearchMouseService;

    public SearchMouseController(SearchMouseService SearchMouseService) {
        this.SearchMouseService = SearchMouseService;
    }

    @GetMapping("/getSliderValues")
    public SliderValuesMax getSliderValues(HttpServletResponse response) throws IOException {
        SliderValuesMax maxValues = SearchMouseService.getSliderValues();
        if (maxValues == null) {
            response.sendError(HttpStatus.NOT_FOUND.value());
        }
        return maxValues;
    }
}
