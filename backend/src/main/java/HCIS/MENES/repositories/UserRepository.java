package HCIS.MENES.repositories;

import HCIS.MENES.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/* Repository for entity user
 *
 */
public interface UserRepository extends JpaRepository<User,Long> {

    /**
     * finds a user by its username
     *
     * @param username username of user
     * @return returns User object
     */
    public User findUserByUsername(String username);

}
