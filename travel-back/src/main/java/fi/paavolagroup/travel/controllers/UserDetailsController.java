package fi.paavolagroup.travel.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.security.RolesAllowed;


@RestController
@RequestMapping("/api/v1")
public class UserDetailsController {
    

    @RolesAllowed({"admin", "user"})
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public ResponseEntity<String> getUser() {
        
        return ResponseEntity.ok("User user");
    }

}