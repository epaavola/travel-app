package fi.paavolagroup.travel.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;


@Entity
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Passions> passions = new ArrayList<Passions>();

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Skills> skills = new ArrayList<Skills>();

    private String organization;

    private boolean active;
    private String type;
    private String trainingLocation;
    private String outreachLocation;
    private java.time.LocalDate startDate;
    private java.time.LocalDate endDate;
    private int length;
    private long price;
    private java.time.LocalDate applyDateStart;
    private java.time.LocalDate applyDateEnd;

    @Column(columnDefinition = "text")
    private String description;

    @Column(columnDefinition = "longtext")
    private String longDescription;
    private String website;
    private String imageURL;

    public Trip(String name, List<Passions> passions, List<Skills> skills, String organization, boolean active, String type,
            String trainingLocation, String outreachLocation, LocalDate startDate, LocalDate endDate, int length,
            long price, LocalDate applyDateStart, LocalDate applyDateEnd, String description, String longDescription, String website,
            String imageURL) {
        this.name = name;
        this.passions = passions;
        this.skills = skills;
        this.organization = organization;
        this.active = active;
        this.type = type;
        this.trainingLocation = trainingLocation;
        this.outreachLocation = outreachLocation;
        this.startDate = startDate;
        this.endDate = endDate;
        this.length = length;
        this.price = price;
        this.applyDateStart = applyDateStart;
        this.applyDateEnd = applyDateEnd;
        this.description = description;
        this.longDescription = longDescription;
        this.website = website;
        this.imageURL = imageURL;
    }

    public void addToPassions(Passions passion) {
        passion.setTrip(this);
        this.passions.add(passion);
    }

    public void addToSkills(Skills skill) {
        skill.setTrip(this);
        this.skills.add(skill);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Passions> getPassions() {
        return passions;
    }

    public void setPassions(List<Passions> passions) {
        this.passions = passions;
    }

    public List<Skills> getSkills() {
        return skills;
    }

    public void setSkills(List<Skills> skills) {
        this.skills = skills;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTrainingLocation() {
        return trainingLocation;
    }

    public void setTrainingLocation(String trainingLocation) {
        this.trainingLocation = trainingLocation;
    }

    public String getOutreachLocation() {
        return outreachLocation;
    }

    public void setOutreachLocation(String outreachLocation) {
        this.outreachLocation = outreachLocation;
    }

    public java.time.LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(java.time.LocalDate startDate) {
        this.startDate = startDate;
    }

    public java.time.LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(java.time.LocalDate endDate) {
        this.endDate = endDate;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public java.time.LocalDate getApplyDateStart() {
        return applyDateStart;
    }

    public void setApplyDateStart(java.time.LocalDate applyDateStart) {
        this.applyDateStart = applyDateStart;
    }

    public java.time.LocalDate getApplyDateEnd() {
        return applyDateEnd;
    }

    public void setApplyDateEnd(java.time.LocalDate applyDateEnd) {
        this.applyDateEnd = applyDateEnd;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Trip() {
    }

    public long getId() {
        return id;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }
    
}
