var curso = {}, cursos = [];
var html;


//------------------------------------------------------------------------------------
function salvar() {
	if($("#id").val() != '') curso.id = $("#id").val();
	curso.nome = $("#nome").val();
	curso.duracao = $("#duracao").val();
	curso.mensalidade = $("#mensalidade").val();
	curso.escola = $("#escola").val();
	
	$.ajax({
		url: "/curso/cadastrar",
		type: "PUT",
		dataType : 'json',
		contentType: "application/json",
		data: JSON.stringify(curso)
	}).done(function(e){
		window.location.reload(true);
	});
}


$(document).ready(function(){
	//listar escolas
	$.ajax({
		url: "/escola/listarTodos",
		type: "PUT",
	}).done(function(e){
		var escolaHtml = '<select class="form-control" id="escola">';
		
		for(escola of e) {
			escolaHtml += '<option value="' + escola.nome + '">' + escola.nome + '</option>';
		}
		
		escolaHtml += '</select>';
		$("#escolaSelect").html(escolaHtml);
	});
	
	listarTodos();
})


//--------------------------------------------------------------------------
function listarTodos() {
	//listar cursos
		$.ajax({
			url: "/curso/listarTodos",
			type: "PUT",
		}).done(function(e){

			cursos = e;
			html = "";
			for(curso1 of cursos) {
				html += '<tr>'
						+'<td class="text-center">' + curso1.id + '</td>'
						+'<td class="text-center">' + curso1.nome + '</td>'
						+'<td class="text-center">' + curso1.duracao + '</td>'
						+'<td class="text-center">' + curso1.mensalidade + '</td>'
						+'<td class="text-center">' + curso1.escola + '</td>'
						+'<td class="text-center"><button class="btn btn-warning" onclick="editar()" value="' + curso1.id + '">&nbsp;</td>'
						+'<td class="text-center"><button class="btn btn-danger" onclick="excluir()" value="' + curso1.id + '">&nbsp;</td>'
					+'</tr>'
					
					+'<tr><td>&nbsp</td></tr>';
			}
			
			$("#cursos").html(html);
		});
}
//---------------------------------------------------------------------------
function editar() {
	var id = $(event.currentTarget).attr('value');

	for(i in cursos) if(cursos[i].id == id) var idBusca = i;
			
	$("#id").val(cursos[idBusca].id);
	$("#nome").val(cursos[idBusca].nome).attr( "disabled", true );
	$("#duracao").val(cursos[idBusca].duracao).attr( "disabled", true );
	$("#mensalidade").val(cursos[idBusca].mensalidade);
	$("#escola").val(cursos[idBusca].escola).attr( "disabled", true );
}


//---------------------------------------------------------------------------
function excluir() {
	var id = $(event.currentTarget).attr('value');
			
	$.ajax({
		url: "/curso/excluir/" + id,
		type: "PUT"
	});
}


//---------------------------------------------------------------------
function buscar() {
	$.ajax({
		url: "/curso/buscar/" + $("#codigo").val(),
		type: "PUT"
	}).done(function(curso1){
		if(curso1 != null) {
			html = '<tr>'
					+'<td class="text-center">' + curso1.id + '</td>'
					+'<td class="text-center">' + curso1.nome + '</td>'
					+'<td class="text-center">' + curso1.duracao + '</td>'
					+'<td class="text-center">' + curso1.mensalidade + '</td>'
					+'<td class="text-center">' + curso1.escola + '</td>'
					+'<td class="text-center"><button class="btn btn-warning" onclick="editar()" value="' + curso1.id + '">&nbsp;</td>'
					+'<td class="text-center"><button class="btn btn-danger" onclick="excluir()" value="' + curso1.id + '">&nbsp;</td>'
				+'</tr>'
				
				+'<tr><td>&nbsp</td></tr>';
		
			$("#cursos").html(html);
		}else {
			alert("Id não encontrado!");
		}
	}).fail(function(){
		alert("Digite apenas numeros!");
	});
}