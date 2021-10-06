package projeto.spring.escola.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import projeto.spring.escola.model.Curso;

public interface Cursos extends JpaRepository<Curso, Long>{

}
