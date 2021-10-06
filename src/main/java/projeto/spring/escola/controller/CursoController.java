package projeto.spring.escola.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import projeto.spring.escola.model.Curso;
import projeto.spring.escola.repository.Cursos;

@Controller
@RequestMapping("/curso")
public class CursoController {

	@Autowired
	private Cursos cursos;
	
	@RequestMapping
	public ModelAndView tela() {
		return new ModelAndView("curso");
	}
	
	@RequestMapping("/cadastrar")
	@ResponseBody
	public Curso cadastrar(@RequestBody Curso curso) {
		return cursos.save(curso);
	}
	
	@RequestMapping("/listarTodos")
	@ResponseBody
	public List<Curso> listarTodos() {
		return cursos.findAll();
	}
	
	@RequestMapping("/buscar/{id}")
	@ResponseBody
	public Optional<Curso> buscar(@PathVariable Long id) {
		return cursos.findById(id);
	}
	
	@RequestMapping("/excluir/{id}")
	@ResponseBody
	public String excluir(@PathVariable Long id) {
		cursos.deleteById(id);
		return "200";
	}
}
