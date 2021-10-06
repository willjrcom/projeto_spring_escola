package projeto.spring.escola.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import projeto.spring.escola.model.Escola;

public interface Escolas extends JpaRepository<Escola, Long>{

}
