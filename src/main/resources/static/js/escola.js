var escola = {}, escolas = [];
var cursosHtml, html, confirm;


//------------------------------------------------------------------------------------
function salvar() {
	if($("#id").val() != '') escola.id = $("#id").val();
	escola.nome = $("#nome").val();
	escola.endereco = $("#endereco").val();
	escola.totalAlunos = $("#totalAlunos").val();
	escola.tipo = $("#tipo").val();
	
	$.ajax({
		url: "/escola/cadastrar",
		type: "PUT",
		dataType : 'json',
		contentType: "application/json",
		data: JSON.stringify(escola)
	}).done(function(e){
		window.location.reload(true);
	});
}


//-------------------------------------------------------------
$(document).ready(function(){
	listarTodos();
});


//----------------------------------------------------------------------------
function listarTodos() {
	$.ajax({
		url: "/escola/listarTodos",
		type: "PUT",
	}).done(function(e){

		escolas = e;
		html = "";
		for(escola1 of escolas) {
			html += '<tr>'
					+'<td class="text-center">' + escola1.id + '</td>'
					+'<td>' + escola1.nome + '</td>'
					+'<td>' + escola1.endereco + '</td>'
					+'<td>' + escola1.totalAlunos + '</td>'
					+'<td>' + escola1.tipo + '</td>'
					+'<td class="text-center"><button class="btn btn-success" onclick="ver()" value="' + escola1.id + '">&nbsp;</td>'
					+'<td class="text-center"><button class="btn btn-warning" onclick="editar()" value="' + escola1.id + '">&nbsp;</td>'
					+'<td class="text-center"><button class="btn btn-danger" onclick="excluir()" value="' + escola1.id + '">&nbsp;</td>'
				+'</tr>'
				
				+'<tr><td>&nbsp</td></tr>';
		}
		
		$("#escolas").html(html);
	});
}
//---------------------------------------------------------------------------
function ver() {
	var id = $(event.currentTarget).attr('value');

	for(i in escolas) if(escolas[i].id == id) var idBusca = i;
			
	$.ajax({
		url: "/curso/listarTodos/",
		type: "PUT"
	}).done(function(e){
		cursosHtml = "Cursos:\n";
		
		for(cursoBusca of e) {
			if(cursoBusca.escola == escolas[idBusca].nome) {
				cursosHtml += '- ' + cursoBusca.nome + '\n';
			}
		}
		alert(cursosHtml);
	});
}


//---------------------------------------------------------------------------
function editar() {
	var id = $(event.currentTarget).attr('value');

	for(i in escolas) if(escolas[i].id == id) var idBusca = i;
			
	$("#id").val(escolas[idBusca].id);
	$("#nome").val(escolas[idBusca].nome);
	$("#endereco").val(escolas[idBusca].endereco).attr( "disabled", true );
	$("#totalAlunos").val(escolas[idBusca].totalAlunos);
	$("#tipo").val(escolas[idBusca].tipo).attr( "disabled", true );
}


//---------------------------------------------------------------------------
function excluir() {
	var id = $(event.currentTarget).attr('value');

	for(i in escolas) if(escolas[i].id == id) var idBusca = i;
	
	confirm = 0;
			
	$.ajax({
		url: "/curso/listarTodos/",
		type: "PUT"
	}).done(function(e){
		for(cursoBusca of e) {
			if(cursoBusca.escola == escolas[idBusca].nome) {
				confirm = 1;
			}
		}
		if(confirm == 0) {
			$.ajax({
				url: "/escola/excluir/" + id,
				type: "PUT"
			});
		}else {
			alert("Essa escola possui cursos cadastrados, remova os cursos primeiro!");
		}
	});
}


//---------------------------------------------------------------------
function buscar() {
	$.ajax({
		url: "/escola/buscar/" + $("#codigo").val(),
		type: "PUT"
	}).done(function(escola1){
		if(escola1 != null) {
			html = '<tr>'
					+'<td class="text-center">' + escola1.id + '</td>'
					+'<td>' + escola1.nome + '</td>'
					+'<td>' + escola1.endereco + '</td>'
					+'<td>' + escola1.totalAlunos + '</td>'
					+'<td>' + escola1.tipo + '</td>'
					+'<td class="text-center"><button class="btn btn-success" onclick="ver()" value="' + escola1.id + '">&nbsp;</td>'
					+'<td class="text-center"><button class="btn btn-warning" onclick="editar()" value="' + escola1.id + '">&nbsp;</td>'
					+'<td class="text-center"><button class="btn btn-danger" onclick="excluir()" value="' + escola1.id + '">&nbsp;</td>'
				+'</tr>'
				
				+'<tr><td>&nbsp</td></tr>';
		
			$("#escolas").html(html);
		}else {
			alert("Id não encontrado!");
		}
	}).fail(function(){
		alert("Digite apenas numeros!");
	});
}