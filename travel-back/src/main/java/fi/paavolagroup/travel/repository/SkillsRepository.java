package fi.paavolagroup.travel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

import fi.paavolagroup.travel.models.Trip;
import fi.paavolagroup.travel.models.Skills;

public interface SkillsRepository extends JpaRepository<Skills, Long> {
    Skills findByName(String name);
    Optional<Skills> findById(long id);

    @Transactional
    Long deleteByTrip(Trip trip);
}
