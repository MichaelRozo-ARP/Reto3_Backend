$(document).ready(function(){
    getAllCategory();
});

function getAllCategory(){
    $.ajax({
        url : "api/Category/all",
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#resultsCategory").empty();
            for(i=0;i<p.length;i++){
                let k=`<div class="col">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${p[i].name}</h5>
                                    <p class="card-text">${p[i].description}</p>
                                </div>
                                <div class="card-footer">
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-outline-primary" onclick='getCategoryById(${p[i].id})'>Actualizar</button>
                                        <button type="button" class="btn btn-outline-primary" onclick='deleteById(${p[i].id})'>Borrar!</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                $("#resultsCategory").append(k);
            }
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function getCategoryData(){
    let cat={
        id:$("#idCategoria").val(),
        name:$("#nombreCategoria").val(),
        description:$("#descripcionCategoria").val()
    }
    return cat;
}
function cleanData(){
    $("#idCategoria").val("");
    $("#nombreCategoria").val("");
    $("#descripcionCategoria").val("");
}
function saveCategory(){

    let data=getCategoryData();
    data.id=null;
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : "api/Category/save",
        type : 'POST',
        data:dataToSend,
        contentType : 'application/json',
        success : function(p) {
            console.log(p);
            cleanData();
            getAllCategory();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function getCategoryById(idCat){
    $(".saveButtonJL").hide();
    $(".updateButtonJL").show();
    $.ajax({
        url : "api/Category/"+idCat,
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#idCategoria").val(p.id);
            $("#nombreCategoria").val(p.name);
            $("#descripcionCategoria").val(p.description);
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function  cancelUpdateCategory(){
    cleanData();
    $(".saveButtonJL").show();
    $(".updateButtonJL").hide();
}
function updateCategory(){

    let data=getCategoryData();
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : "api/Category/update",
        type : 'PUT',
        data:dataToSend,
        contentType : 'application/json',
        success : function(p) {
            console.log(p);
            cancelUpdateCategory();
            getAllCategory();

        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}

function deleteById(idCat){
    $.ajax({
        url : "api/Category/"+idCat,
        type : 'DELETE',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            cleanData();
            getAllCategory();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}