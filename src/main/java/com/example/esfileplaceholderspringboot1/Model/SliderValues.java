package com.example.esfileplaceholderspringboot1.Model;

public class SliderValues {
    private double maxLength;
    private double maxWidth;
    private double maxHeight;
    private double maxWeight;
    private double maxMaxDPI;
    private double maxPollingRate;

    public SliderValues(){}

    public SliderValues(double maxLength, double maxWidth, double maxHeight, double maxWeight, double maxMaxDPI, double maxPollingRate) {
        this.maxLength = maxLength;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.maxWeight = maxWeight;
        this.maxMaxDPI = maxMaxDPI;
        this.maxPollingRate = maxPollingRate;
    }

    public double getMaxLength() {
        return maxLength;
    }

    public void setMaxLength(double maxLength) {
        this.maxLength = maxLength;
    }

    public double getMaxWidth() {
        return maxWidth;
    }

    public void setMaxWidth(double maxWidth) {
        this.maxWidth = maxWidth;
    }

    public double getMaxHeight() {
        return maxHeight;
    }

    public void setMaxHeight(double maxHeight) {
        this.maxHeight = maxHeight;
    }

    public double getMaxWeight() {
        return maxWeight;
    }

    public void setMaxWeight(double maxWeight) {
        this.maxWeight = maxWeight;
    }

    public double getMaxMaxDPI() {
        return maxMaxDPI;
    }

    public void setMaxMaxDPI(double maxMaxDPI) {
        this.maxMaxDPI = maxMaxDPI;
    }

    public double getMaxPollingRate() {
        return maxPollingRate;
    }

    public void setMaxPollingRate(double maxPollingRate) {
        this.maxPollingRate = maxPollingRate;
    }
}
