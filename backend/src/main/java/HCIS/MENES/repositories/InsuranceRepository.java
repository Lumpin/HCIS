package HCIS.MENES.repositories;

import HCIS.MENES.entity.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;

/* Repository for entity insurance
 *
 */
public interface InsuranceRepository extends JpaRepository<Insurance,Long> {
}
