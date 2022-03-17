package com.example.esfileplaceholderspringboot1.SearchMouse.Service;

import com.example.esfileplaceholderspringboot1.Global.Model.Mouse;
import com.example.esfileplaceholderspringboot1.SearchMouse.Model.FilteredMouseSearch;
import com.example.esfileplaceholderspringboot1.SearchMouse.Model.SliderValuesMax;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchMouseService {

    Logger errorLogger = LoggerFactory.getLogger(SearchMouseService.class);

    final JdbcTemplate db;

    public SearchMouseService(JdbcTemplate db) {
        this.db = db;
    }

    public SliderValuesMax getSliderValues() {
        String sql = "SELECT MAX(length) AS length, MAX(width) AS width, MAX(height) AS height, MAX(weight) AS weight, MAX(dpi) AS dpi, MAX(pollingRate) AS pollingRate FROM mice";

        try {
            return db.queryForObject(sql, new BeanPropertyRowMapper<>(SliderValuesMax.class));
        }
        catch (Exception e) {
            errorLogger.error("Error with getSliderValues():\n" + e);
            return null;
        }
    }

    public List<Mouse> getFilteredMice(FilteredMouseSearch filteredMouseSearch) {
        String sql = "SELECT * FROM Mice WHERE";

        // brandList
        if (filteredMouseSearch.getBrandList().size() > 0) {
            sql += " brand IN (";
            for (int i = 0; i < filteredMouseSearch.getBrandList().size(); i++) {
                if (i + 1 < filteredMouseSearch.getBrandList().size()) {
                    sql += "'" + filteredMouseSearch.getBrandList().get(i) + "', ";
                } else {
                    sql += "'" + filteredMouseSearch.getBrandList().get(i) + "'";
                }
            }
            sql += ")";
        }

        // lengthMin
        sql += " AND length >= " + filteredMouseSearch.getLengthMin();
        // lengthMax
        sql += " AND length <= " + filteredMouseSearch.getLengthMax();
        // widthMin
        sql += " AND width >= " + filteredMouseSearch.getWidthMin();
        // widthMax
        sql += " AND width <= " + filteredMouseSearch.getWidthMax();
        // heightMin
        sql += " AND height >= " + filteredMouseSearch.getHeightMin();
        // heightMax
        sql += " AND height <= " + filteredMouseSearch.getHeightMax();
        // weightMin
        sql += " AND weight >= " + filteredMouseSearch.getWeightMin();
        // weightMax
        sql += " AND weight <= " + filteredMouseSearch.getWeightMax();

        // connectivity
        if (filteredMouseSearch.isWired() && !filteredMouseSearch.isWireless()) {
           sql += " AND wireless LIKE 'false'";
        } else if (!filteredMouseSearch.isWired() && filteredMouseSearch.isWireless()) {
            sql += " AND wireless LIKE 'true'";
        }

        // shape
        if (filteredMouseSearch.isAmbidextrous() && !filteredMouseSearch.isErgonomic()) {
            sql += " AND shape LIKE 'false'";
        } else if (!filteredMouseSearch.isAmbidextrous() && filteredMouseSearch.isErgonomic()) {
            sql += " AND shape LIKE 'true'";
        }

        // sensorList
        if (filteredMouseSearch.getSensorList().size() > 0) {
            sql += " AND sensor IN (";
            for (int i = 0; i < filteredMouseSearch.getSensorList().size(); i++) {
                if (i + 1 < filteredMouseSearch.getSensorList().size()) {
                    sql += "'" + filteredMouseSearch.getSensorList().get(i) + "', ";
                } else {
                    sql += "'" + filteredMouseSearch.getSensorList().get(i) + "'";
                }
            }
            sql += ")";
        }

        // dpiMin
        sql += " AND dpi >= " + filteredMouseSearch.getDpiMin();
        // dpiMax
        sql += " AND dpi <= " + filteredMouseSearch.getDpiMax();
        // pollingRateMin
        sql += " AND pollingRate >= " + filteredMouseSearch.getPollingRateMin();
        // pollingRateMax
        sql += " AND pollingRate <= " + filteredMouseSearch.getPollingRateMax();

        System.out.println(sql);

        try {
            return db.query(sql, new BeanPropertyRowMapper<>(Mouse.class));
        } catch (Exception e) {
            errorLogger.error("Error with getFilteredMice():\n" + e);
            return null;
        }
    }
}
