package HCIS.MENES.repositories;

import HCIS.MENES.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/* Repository for entity patient with all logical read and write operations
 *
 */
public interface PatientRepository extends JpaRepository<Patient,Long> {

    @Query("SELECT u FROM Patient u where u.user.username = :username")
    public Patient getPatientByUsername(@Param("username") String username);

}
