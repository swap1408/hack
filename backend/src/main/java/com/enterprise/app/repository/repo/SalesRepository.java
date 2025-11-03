package com.enterprise.app.repository.repo;

import com.enterprise.app.model.Sales;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesRepository extends JpaRepository<Sales, Long> {
}
