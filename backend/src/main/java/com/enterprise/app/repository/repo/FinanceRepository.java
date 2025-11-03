package com.enterprise.app.repository.repo;

import com.enterprise.app.model.Finance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FinanceRepository extends JpaRepository<Finance, Long> {
}
