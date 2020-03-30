package HCIS.MENES.repositories;
import HCIS.MENES.entity.Physician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/* Repository for entity physician with all logical read and write operations
 *
 */
public interface PhysicianRepository extends JpaRepository<Physician,Long> {

    @Query("SELECT u FROM Physician u where u.user.username =:username")
    public Physician getphysicianbyusername(@Param("username") String username);

}
