package HSCI.menesklou.repositories;

import HSCI.menesklou.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    public User findUserByUsername(String username);
}
