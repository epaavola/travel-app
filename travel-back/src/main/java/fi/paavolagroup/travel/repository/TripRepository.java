package fi.paavolagroup.travel.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fi.paavolagroup.travel.models.Trip;

public interface TripRepository extends JpaRepository<Trip, Long>{
    
    Page<Trip> findByName(String name, Pageable pageable);
    Page<Trip> findByOrganization(String organization, Pageable pageable);
    Optional<Trip> findById(long id);
	Trip findByName(String string);
	Trip findByOrganization(String string);
}
