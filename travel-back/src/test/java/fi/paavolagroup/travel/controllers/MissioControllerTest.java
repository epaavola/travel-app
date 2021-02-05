package fi.paavolagroup.travel.controllers;

import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import fi.paavolagroup.travel.models.Trip;
import fi.paavolagroup.travel.models.Passions;
import fi.paavolagroup.travel.models.Skills;
import fi.paavolagroup.travel.models.User;
import fi.paavolagroup.travel.repository.TripRepository;
import fi.paavolagroup.travel.service.FilesStorageService;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import java.net.URL;
import java.util.List;

@DataJpaTest
@Transactional
class MissioControllerTest {
    
    @Autowired
    private TripRepository tripRepository;

    @MockBean
    private FilesStorageService storageService;

    private List<Passions> testPassions = List.of(new Passions("Fokus1"), new Passions("Fokus1"));
    private List<Skills> testSkills = List.of(new Skills("Skill1"), new Skills("Skills2"));

    private Trip testMissio = new Trip(
        "Testi Missio", this.testPassions, this.testSkills, "SVK Missio", 
        false, null, null, null, 
        null, null, 0, 0, 
        null, null, null, null, 
        null, null
    );

    @BeforeEach
    public void setup() {
        tripRepository.save(this.testMissio);
    }

    @Test
    public void testSaveNewMissio() throws Exception {
        
        Trip trip = tripRepository.findByName("Testi Missio");
        
        assertEquals("Testi Missio", trip.getName());
    }

    @Test
    public void testFindMissioByOrganization() throws Exception {
        
        Trip trip = tripRepository.findByOrganization("SVK Missio");
        
        assertEquals("Testi Missio", trip.getName());
    }

    @Test
    public void testEditMissio() throws Exception {

        Trip trip = tripRepository.findByName("Testi Missio");
        System.out.println(trip.getPassions());
     //   missio.setOrganization("Fida International");
     //   missioRepository.save(missio);

     //   Missio updatedMissio = missioRepository.findByOrganization("Fida International");

     //   assertEquals("Testi Missio", updatedMissio.getName());
    }
}