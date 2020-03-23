package HCIS.MENES.repositories;

import HCIS.MENES.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PatientRepository extends JpaRepository<Patient,Long> {
    @Query("SELECT u FROM Patient u where u.user.username = :username")
    public Patient getPatientByusername(@Param("username") String username);
}
