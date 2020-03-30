package HCIS.MENES.repositories;

import HCIS.MENES.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/* Repository for entity user
 *
 */
public interface UserRepository extends JpaRepository<User,Long> {

    /**
     *
     * @param username
     * @return
     */
    public User findUserByUsername(String username);

}
