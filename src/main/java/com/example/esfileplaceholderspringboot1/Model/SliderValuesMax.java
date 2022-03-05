package com.example.esfileplaceholderspringboot1.Model;

public class SliderValuesMax {
    private double length;
    private double width;
    private double height;
    private double weight;
    private double dpi;
    private double pollingRate;

    public SliderValuesMax(){}

    public SliderValuesMax(double length, double width, double height, double weight, double dpi, double pollingRate) {
        this.length = length;
        this.width = width;
        this.height = height;
        this.weight = weight;
        this.dpi = dpi;
        this.pollingRate = pollingRate;
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

    public double getDpi() {
        return dpi;
    }

    public void setDpi(double dpi) {
        this.dpi = dpi;
    }

    public double getPollingRate() {
        return pollingRate;
    }

    public void setPollingRate(double pollingRate) {
        this.pollingRate = pollingRate;
    }
}
