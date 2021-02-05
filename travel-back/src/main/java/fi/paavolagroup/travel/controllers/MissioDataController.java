package fi.paavolagroup.travel.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import fi.paavolagroup.travel.models.Trip;
import fi.paavolagroup.travel.repository.TripRepository;
import fi.paavolagroup.travel.repository.PassionsRepository;
import fi.paavolagroup.travel.repository.SkillsRepository;
import fi.paavolagroup.travel.service.FilesStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import static fi.paavolagroup.travel.security.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RestController
@RequestMapping("/api/v1/missions")
public class MissioDataController {

    @Autowired
    private TripRepository tripRepository;

   // private OrganizationRepository organizationRepository;

    @Autowired
    private PassionsRepository passionsRepository;

    @Autowired
    private SkillsRepository skillsRepository;

    @Autowired
    private FilesStorageService storageService;

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllMissions(
            @RequestParam(required = false)String name,
            @RequestParam(required = false)String organization,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size
        ) {

        try {
            List<Trip> trips = new ArrayList<Trip>();
            Pageable paging = PageRequest.of(page,size);

            Page<Trip> pageTrips;
            if(name == null && organization == null)
                pageTrips = tripRepository.findAll(paging);
            else if(organization == null)
                pageTrips = tripRepository.findByName(name, paging);
            else
                pageTrips = tripRepository.findByOrganization(organization, paging);

            trips = pageTrips.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("missions", trips);
            response.put("currentPage", pageTrips.getNumber());
            response.put("totalItems", pageTrips.getTotalElements());
            response.put("totalPages", pageTrips.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getMissioById(@PathVariable final long id) {
        Optional<Trip> tripData = tripRepository.findById(id);
        if (tripData.isPresent()) {
            return new ResponseEntity<>(tripData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping("/")
    public ResponseEntity<Trip> createMissio(@RequestBody Trip trip) {

        trip.getPassions().forEach((passion) -> {
            passion.setTrip(trip);
        });

        trip.getSkills().forEach((skill) -> {
            skill.setTrip(trip);
        });

        try {
            Trip newTrip = tripRepository.save(trip);
            return new ResponseEntity<>(newTrip, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public ResponseEntity<Trip> deleteMissio(@PathVariable final long id) {
        try {
            //Delete image from server
            try {
                String[] imgURL = tripRepository.findById(id).get().getImageURL().split("files/");
                String imageName = imgURL[1];
                storageService.deleteFile(imageName);
            } catch (Exception e) {
                System.out.println(e);
            }
            //Delete missio from database
            tripRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateMissio(@PathVariable final long id, @RequestBody Trip trip) {

        Optional<Trip> tripData = tripRepository.findById(id);
        if (tripData.isPresent()) {
        
            //Set updated data to new Missio object
            Trip updatedTrip = tripData.get();           
            passionsRepository.deleteByTrip(updatedTrip);
            skillsRepository.deleteByTrip(updatedTrip);
            updatedTrip.setName(trip.getName());
            trip.getPassions().forEach( (passion) -> { passion.setTrip(updatedTrip); passionsRepository.save(passion);});    
            trip.getSkills().forEach( (skill) -> { skill.setTrip(updatedTrip); skillsRepository.save(skill);});
            updatedTrip.setOrganization(trip.getOrganization());
            updatedTrip.setActive(trip.isActive());
            updatedTrip.setType(trip.getType());
            updatedTrip.setTrainingLocation(trip.getTrainingLocation());
            updatedTrip.setOutreachLocation(trip.getOutreachLocation());
            updatedTrip.setStartDate(trip.getStartDate());
            updatedTrip.setEndDate(trip.getEndDate());
            updatedTrip.setLength(trip.getLength());
            updatedTrip.setPrice(trip.getPrice());
            updatedTrip.setApplyDateStart(trip.getApplyDateStart());
            updatedTrip.setApplyDateEnd(trip.getApplyDateEnd());
            updatedTrip.setDescription(trip.getDescription());
            updatedTrip.setLongDescription(trip.getLongDescription());
            updatedTrip.setWebsite(trip.getWebsite());
            updatedTrip.setImageURL(trip.getImageURL());

            //Save updated Missio object
            return new ResponseEntity<>(tripRepository.save(updatedTrip), HttpStatus.OK);
        } else {
            // Return 'Not found' if missio doesn't exsist
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
