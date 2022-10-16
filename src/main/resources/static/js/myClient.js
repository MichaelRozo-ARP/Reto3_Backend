$(document).ready(function(){
    getAllClient();
});

function getAllClient(){
    $.ajax({
        url : "api/Client/all",
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#results").empty();
            let l="";
            for (let i=0;i<p.length;i++){
                l+=`<div class="col">
                        <div class="card"><div class="card-header">
                                    <h5 class="card-title">${p[i].name}</h5>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Email: ${p[i].email}</p>
                                    <p class="card-text">Password: ${p[i].password}</p>
                                    <p class="card-text">Edad: ${p[i].age}</p>
                                </div>
                                <div class="card-footer">
                                      <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-outline-primary" onclick='getClientById(${p[i].idClient})'>Actualizar</button>
                                        <button type="button" class="btn btn-outline-primary" onclick='deleteById(${p[i].idClient})'>Borrar!</button>
                                    </div>
                                
                                </div>
                        </div>
                    </div>
                    `;
            }
            $("#results").append(l);
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function getClientData(){
    let client={
        idClient:$("#idCliente").val(),
        name:$("#nombreCliente").val(),
        password:$("#password").val(),
        age:$("#edad").val(),
        email:$("#email").val()
    }
    return client;
}
function cleanData(){
    $("#idCliente").val("");
    $("#nombreCliente").val("");
    $("#password").val("");
    $("#email").val("");
    $("#edad").val("");
}
function saveClient(){

    let data=getClientData();
    data.id=null;
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : "api/Client/save",
        type : 'POST',
        data:dataToSend,
        contentType : 'application/json',
        success : function(p) {
            console.log(p);
            cleanData();
            getAllClient();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function getClientById(idClient){
    $(".saveButtonJL").hide();
    $(".updateButtonJL").show();
    $.ajax({
        url : "api/Client/"+idClient,
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#idCliente").val(p.idClient);
            $("#nombreCliente").val(p.name);
            $("#email").val(p.email);
            $("#password").val(p.password);
            $("#edad").val(p.age);
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function  cancelUpdateClient(){
    cleanData();
    $(".saveButtonJL").show();
    $(".updateButtonJL").hide();
}
function updateClient(){

    let data=getClientData();
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : "api/Client/update",
        type : 'PUT',
        data:dataToSend,
        contentType : 'application/json',
        success : function(p) {
            console.log(p);
            cancelUpdateClient();
            getAllClient();

        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function deleteById(idClient){
    $.ajax({
        url : "api/Client/"+idClient,
        type : 'DELETE',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            cleanData();
            getAllClient();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}