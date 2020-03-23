package HCIS.MENES.repositories;

import HCIS.MENES.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MedicalRecordRespository extends JpaRepository<MedicalRecord,Long> {
    @Query("SELECT u FROM MedicalRecord u where u.patient.user.username = :username")
    public List<MedicalRecord> getmedicalrecordfromuserUsername(@Param("username") String username);

    @Query("SELECT u FROM MedicalRecord u where u.physician.user.username = :username")
    public List<MedicalRecord> getMedicalRecords(@Param("username") String username);

    @Query("SELECT u FROM MedicalRecord u where u.patient.id = :id")
    public List<MedicalRecord> getMedicalRecordsfromPatientId(@Param("id") Long id);

    @Query("SELECT u FROM MedicalRecord u where u.physician.id = :id")
    public List<MedicalRecord> getMedicalRecordsByPhysicianId(@Param("id") Long id);

}
