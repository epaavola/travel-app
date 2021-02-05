package fi.paavolagroup.travel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fi.paavolagroup.travel.models.User;

public interface UserRepository extends JpaRepository<User, String> {
    
}
