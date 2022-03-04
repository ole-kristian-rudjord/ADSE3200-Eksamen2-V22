package com.example.esfileplaceholderspringboot1.Model;

public class SliderValuesMax {
    private double length;
    private double width;
    private double height;
    private double weight;
    private double maxDPI;
    private double pollingRate;

    public SliderValuesMax(){}

    public SliderValuesMax(double length, double width, double height, double weight, double maxDPI, double pollingRate) {
        this.length = length;
        this.width = width;
        this.height = height;
        this.weight = weight;
        this.maxDPI = maxDPI;
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

    public double getMaxDPI() {
        return maxDPI;
    }

    public void setMaxDPI(double maxDPI) {
        this.maxDPI = maxDPI;
    }

    public double getPollingRate() {
        return pollingRate;
    }

    public void setPollingRate(double pollingRate) {
        this.pollingRate = pollingRate;
    }
}
