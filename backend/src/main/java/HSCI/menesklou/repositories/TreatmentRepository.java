package HSCI.menesklou.repositories;

import HSCI.menesklou.entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreatmentRepository extends JpaRepository<Treatment,Long> {
}
