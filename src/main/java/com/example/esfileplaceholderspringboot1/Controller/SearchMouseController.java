package com.example.esfileplaceholderspringboot1.Controller;

import com.example.esfileplaceholderspringboot1.Model.FilteredMouseSearch;
import com.example.esfileplaceholderspringboot1.Model.Mouse;
import com.example.esfileplaceholderspringboot1.Model.SliderValuesMax;
import com.example.esfileplaceholderspringboot1.Service.SearchMouseService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
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

    @GetMapping("/getFilteredMice")
    public List<Mouse> getFilteredMice(FilteredMouseSearch filteredMouseSearch, HttpServletResponse response) throws IOException {
        List<Mouse> mouseList = SearchMouseService.getFilteredMice(filteredMouseSearch);
        if (mouseList == null || mouseList.size() <= 0) {
            response.sendError(HttpStatus.NOT_FOUND.value());
        }
        return mouseList;
    }
}
