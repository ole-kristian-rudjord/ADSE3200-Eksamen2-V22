package com.example.esfileplaceholderspringboot1.Controller;

import com.example.esfileplaceholderspringboot1.Model.SliderValues;
import com.example.esfileplaceholderspringboot1.Service.SearchMouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SearchMouseController {

    @Autowired
    SearchMouseService SearchMouseService;

    @GetMapping("/getSliderValues")
    public List<SliderValues> getSliderValues() {
        return SearchMouseService.getSliderValues();
    }
}
