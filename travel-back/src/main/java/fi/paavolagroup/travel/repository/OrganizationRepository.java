package fi.paavolagroup.travel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import fi.paavolagroup.travel.models.Organizations;

public interface OrganizationRepository extends JpaRepository<Organizations, Long> {
    Organizations findByName(String name);
    Optional<Organizations> findById(long id);
}
