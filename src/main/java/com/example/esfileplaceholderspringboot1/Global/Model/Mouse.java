package com.example.esfileplaceholderspringboot1.Global.Model;

public class Mouse {
    private int id;
    private String brand;
    private String model;
    private double length;
    private double width;
    private double height;
    private double weight;
    private boolean wireless;
    private boolean shape;
    private String sensor;
    private int pollingRate;
    private int dpi;
    private String svgTop;
    private String svgSide;
    private String svgBack;

    public Mouse() {}

    public Mouse(int id, String brand, String model, double length, double width, double height, double weight, boolean wireless, boolean shape, String sensor, int pollingRate, int dpi, String svgTop, String svgSide, String svgBack) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.length = length;
        this.width = width;
        this.height = height;
        this.weight = weight;
        this.wireless = wireless;
        this.shape = shape;
        this.sensor = sensor;
        this.pollingRate = pollingRate;
        this.dpi = dpi;
        this.svgTop = svgTop;
        this.svgSide = svgSide;
        this.svgBack = svgBack;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public boolean isWireless() {
        return wireless;
    }

    public void setWireless(boolean wireless) {
        this.wireless = wireless;
    }

    public boolean isShape() {
        return shape;
    }

    public void setShape(boolean shape) {
        this.shape = shape;
    }

    public String getSensor() {
        return sensor;
    }

    public void setSensor(String sensor) {
        this.sensor = sensor;
    }

    public int getPollingRate() {
        return pollingRate;
    }

    public void setPollingRate(int pollingRate) {
        this.pollingRate = pollingRate;
    }

    public int getDpi() {
        return dpi;
    }

    public void setDpi(int dpi) {
        this.dpi = dpi;
    }

    public String getSvgTop() {
        return svgTop;
    }

    public void setSvgTop(String svgTop) {
        this.svgTop = svgTop;
    }

    public String getSvgSide() {
        return svgSide;
    }

    public void setSvgSide(String svgSide) {
        this.svgSide = svgSide;
    }

    public String getSvgBack() {
        return svgBack;
    }

    public void setSvgBack(String svgBack) {
        this.svgBack = svgBack;
    }
}
