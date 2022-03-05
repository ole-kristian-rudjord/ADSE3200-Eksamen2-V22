package com.example.esfileplaceholderspringboot1.Model;

import java.util.List;

public class FilteredMouseSearch {
    private List<String> brandList;
    private double lengthMin;
    private double lengthMax;
    private double widthMin;
    private double widthMax;
    private double heightMin;
    private double heightMax;
    private double weightMin;
    private double weightMax;
    private boolean wired;
    private boolean wireless;
    private boolean ambidextrous;
    private boolean ergonomic;
    private List<String> sensorList;
    private double dpiMin;
    private double dpiMax;
    private double pollingRateMin;
    private double pollingRateMax;

    public FilteredMouseSearch(){};

    public FilteredMouseSearch(List<String> brandList, double lengthMin, double lengthMax, double widthMin, double widthMax, double heightMin, double heightMax, double weightMin, double weightMax, boolean wired, boolean wireless, boolean ambidextrous, boolean ergonomic, List<String> sensorList, double dpiMin, double dpiMax, double pollingRateMin, double pollingRateMax) {
        this.brandList = brandList;
        this.lengthMin = lengthMin;
        this.lengthMax = lengthMax;
        this.widthMin = widthMin;
        this.widthMax = widthMax;
        this.heightMin = heightMin;
        this.heightMax = heightMax;
        this.weightMin = weightMin;
        this.weightMax = weightMax;
        this.wired = wired;
        this.wireless = wireless;
        this.ambidextrous = ambidextrous;
        this.ergonomic = ergonomic;
        this.sensorList = sensorList;
        this.dpiMin = dpiMin;
        this.dpiMax = dpiMax;
        this.pollingRateMin = pollingRateMin;
        this.pollingRateMax = pollingRateMax;
    }

    public List<String> getBrandList() {
        return brandList;
    }

    public void setBrandList(List<String> brandList) {
        this.brandList = brandList;
    }

    public double getLengthMin() {
        return lengthMin;
    }

    public void setLengthMin(double lengthMin) {
        this.lengthMin = lengthMin;
    }

    public double getLengthMax() {
        return lengthMax;
    }

    public void setLengthMax(double lengthMax) {
        this.lengthMax = lengthMax;
    }

    public double getWidthMin() {
        return widthMin;
    }

    public void setWidthMin(double widthMin) {
        this.widthMin = widthMin;
    }

    public double getWidthMax() {
        return widthMax;
    }

    public void setWidthMax(double widthMax) {
        this.widthMax = widthMax;
    }

    public double getHeightMin() {
        return heightMin;
    }

    public void setHeightMin(double heightMin) {
        this.heightMin = heightMin;
    }

    public double getHeightMax() {
        return heightMax;
    }

    public void setHeightMax(double heightMax) {
        this.heightMax = heightMax;
    }

    public double getWeightMin() {
        return weightMin;
    }

    public void setWeightMin(double weightMin) {
        this.weightMin = weightMin;
    }

    public double getWeightMax() {
        return weightMax;
    }

    public void setWeightMax(double weightMax) {
        this.weightMax = weightMax;
    }

    public boolean isWired() {
        return wired;
    }

    public void setWired(boolean wired) {
        this.wired = wired;
    }

    public boolean isWireless() {
        return wireless;
    }

    public void setWireless(boolean wireless) {
        this.wireless = wireless;
    }

    public boolean isAmbidextrous() {
        return ambidextrous;
    }

    public void setAmbidextrous(boolean ambidextrous) {
        this.ambidextrous = ambidextrous;
    }

    public boolean isErgonomic() {
        return ergonomic;
    }

    public void setErgonomic(boolean ergonomic) {
        this.ergonomic = ergonomic;
    }

    public List<String> getSensorList() {
        return sensorList;
    }

    public void setSensorList(List<String> sensorList) {
        this.sensorList = sensorList;
    }

    public double getDpiMin() {
        return dpiMin;
    }

    public void setDpiMin(double dpiMin) {
        this.dpiMin = dpiMin;
    }

    public double getDpiMax() {
        return dpiMax;
    }

    public void setDpiMax(double dpiMax) {
        this.dpiMax = dpiMax;
    }

    public double getPollingRateMin() {
        return pollingRateMin;
    }

    public void setPollingRateMin(double pollingRateMin) {
        this.pollingRateMin = pollingRateMin;
    }

    public double getPollingRateMax() {
        return pollingRateMax;
    }

    public void setPollingRateMax(double pollingRateMax) {
        this.pollingRateMax = pollingRateMax;
    }
}
