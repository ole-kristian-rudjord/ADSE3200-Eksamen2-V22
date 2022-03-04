package com.example.esfileplaceholderspringboot1.Service;

import com.example.esfileplaceholderspringboot1.Model.Mouse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompareShapesService {

    Logger errorLogger = LoggerFactory.getLogger(CompareShapesService.class);

    @Autowired
    JdbcTemplate db;

    public Mouse getMouse(Mouse mouse) {
        /*String propperMouseName = mouse.replace("RPspace", " ").replace("RPplus", "+").replace("RPminus", "-");*/
        String sql = "SELECT * FROM mice WHERE brand=? AND model=?";

        try {
            return db.queryForObject(sql, new BeanPropertyRowMapper<>(Mouse.class), mouse.getBrand(), mouse.getModel()/*propperMouseName*/);
        }
        catch (Exception e) {
            errorLogger.error("Error with getMouse():\n" + e);
            return null;
        }
    }

    public List<Mouse> getDistinctBrands() {
        String sql = "SELECT DISTINCT(brand) FROM mice";

        try {
            return db.query(sql, new BeanPropertyRowMapper<>(Mouse.class));
        }
        catch (Exception e) {
            errorLogger.error("Error with getDistinctBrand():\n" + e);
            return null;
        }
    }

    public List<Mouse> getMatchingModels(Mouse brand) {
        try {
            if (brand.getBrand().equals("")) {
                return db.query("SELECT model FROM mice", new BeanPropertyRowMapper<>(Mouse.class));
            }
            else {
                return db.query("SELECT model FROM mice WHERE brand=?", new BeanPropertyRowMapper<>(Mouse.class), brand.getBrand());
            }
        }
        catch (Exception e) {
            errorLogger.error("Error with getDistinctBrand():\n" + e);
            return null;
        }
    }
}
