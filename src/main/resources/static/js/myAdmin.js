$(document).ready(function(){
    getAllAdmin();
});
function getAdminData(){
    let admin={
        idAdmin:$("#idAdmin").val(),
        email:$("#email").val(),
        name:$("#name").val(),
        password:$("#password").val()
    }
    return admin;
}
function cleanData(){
    $("#idAdmin").val("");
    $("#email").val("");
    $("#name").val("");
    $("#password").val("");
}
function saveAdmin(){

    let data=getAdminData();
    data.id=null;
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : "api/Admin/save",
        type : 'POST',
        data:dataToSend,
        contentType : 'application/json',
        success : function(p) {
            console.log(p);
            cleanData();
            getAllAdmin();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function getAllAdmin(){
    $.ajax({
        url : "api/Admin/all",
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#results").empty();
            for(i=0;i<p.length;i++){
                let k=`<div class="col">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Name: ${p[i].name}</h5>
                                    <p class="card-text">Email: ${p[i].email}</p>
                                    <p class="card-text">Password: ${p[i].password}</p>
                                </div>
                                <div class="card-footer">
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-outline-primary" onclick='getAdminById(${p[i].idAdmin})'>Actualizar</button>
                                        <button type="button" class="btn btn-outline-primary" onclick='deleteById(${p[i].idAdmin})'>Borrar!</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                $("#results").append(k);
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
function getAdminById(idAdmin){
    $(".saveButtonJL").hide();
    $(".updateButtonJL").show();
    $.ajax({
        url : "api/Admin/"+idAdmin,
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#idAdmin").val(p.idAdmin);
            $("#email").val(p.email);
            $("#name").val(p.name);
            $("#password").val(p.password);
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function  cancelUpdateAdmin(){
    cleanData();
    $(".saveButtonJL").show();
    $(".updateButtonJL").hide();
}
function updateAdmin(){

    let data=getAdminData();
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : "api/Admin/update",
        type : 'PUT',
        data:dataToSend,
        contentType : 'application/json',
        success : function(p) {
            console.log(p);
            cancelUpdateAdmin();
            getAllAdmin();
            },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}

function deleteById(idAdmin){
    $.ajax({
        url : "api/Admin/"+idAdmin,
        type : 'DELETE',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            cleanData();
            getAllAdmin();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
