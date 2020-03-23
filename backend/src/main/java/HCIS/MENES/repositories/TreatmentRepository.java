package HCIS.MENES.repositories;

import HCIS.MENES.entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreatmentRepository extends JpaRepository<Treatment,Long> {
}
