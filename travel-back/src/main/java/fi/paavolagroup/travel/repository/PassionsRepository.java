package fi.paavolagroup.travel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;


import fi.paavolagroup.travel.models.Trip;
import fi.paavolagroup.travel.models.Passions;

public interface PassionsRepository extends JpaRepository<Passions, Long> {
    Passions findByName(String name);
    Optional<Passions> findById(long id);

    @Transactional
    Long deleteByTrip(Trip trip);
}
