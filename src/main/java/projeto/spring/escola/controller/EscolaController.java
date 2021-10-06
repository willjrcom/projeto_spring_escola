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

import projeto.spring.escola.model.Escola;
import projeto.spring.escola.repository.Escolas;

@Controller
@RequestMapping({"/", "/escola"})
public class EscolaController {

	@Autowired
	private Escolas escolas;
	
	@RequestMapping
	public ModelAndView tela() {
		return new ModelAndView("escola");
	}
	
	@RequestMapping("/cadastrar")
	@ResponseBody
	public Escola cadastrar(@RequestBody Escola escola) {
		return escolas.save(escola);
	}
	
	@RequestMapping("/listarTodos")
	@ResponseBody
	public List<Escola> listarTodos() {
		return escolas.findAll();
	}
	
	@RequestMapping("/buscar/{id}")
	@ResponseBody
	public Optional<Escola> buscar(@PathVariable Long id) {
		return escolas.findById(id);
	}
	
	@RequestMapping("/excluir/{id}")
	@ResponseBody
	public String excluir(@PathVariable Long id) {
		escolas.deleteById(id);
		return "200";
	}
}
