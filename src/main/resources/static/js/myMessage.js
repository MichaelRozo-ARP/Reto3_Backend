$(document).ready(function (){
    getClientList();
    getPartyroomList();
    getMessage();
});
function getFrontMessageData(){
    let k={
        idMessage:$("#idMessage").val(),
        messageText:$("#messageText").val(),
        client:{
            idClient:$("#clientSelect").val()
        },
        partyroom:{
            id:$("#partyroomSelect").val()
        }
    }
    return k;
}
function cleanFields(){
    $("#idMessage").val("");
    $("#messageText").val("");
    $("#clientSelect").val("").change();
    $("#partyroomSelect").val("").change();
}
function getClientList(){
    $.ajax({
        url : "api/Client/all",
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#clientSelect").empty();
            for(let i=0;i<p.length;i++){
                let s=`
                    <option value="${p[i].idClient}">${p[i].name}</option>                
                `;
                $("#clientSelect").append(s);
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
function getPartyroomList(){
    $.ajax({
        url : "api/Partyroom/all",
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#partyroomSelect").empty();
            for(let i=0;i<p.length;i++){
                let s=`
                    <option value="${p[i].id}">${p[i].name}</option>                
                `;
                $("#partyroomSelect").append(s);
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
function saveMessage(){
    let data=getFrontMessageData();
    data.id=null;
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : "api/Message/save",
        type : 'POST',
        dataType : 'json',
        contentType:'application/json',
        data:dataToSend,
        success : function(p) {
            console.log(p);
            cleanFields();
            getMessage();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function getMessage(){
    $.ajax({
        url : "api/Message/all",
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#results").empty();
            let l="";
            for (let i=0;i<p.length;i++){
                l+=`<div class="col">
                        <div class="card"><div class="card-header">
                                    <h5 class="card-title">${p[i].messageText}</h5>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Cliente: ${p[i].client.name}</p>
                                    <p class="card-text">Salon: ${p[i].partyroom.name}</p>
                                </div>
                                <div class="card-footer">
                                      <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-outline-primary" onclick='getMessageById(${p[i].idMessage})'>Actualizar</button>
                                        <button type="button" class="btn btn-outline-primary" onclick='deleteMessageById(${p[i].idMessage})'>Borrar!</button>
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
function getMessageById(idMessage){
    $(".saveButtonJL").hide();
    $(".updateButtonJL").show();
    $.ajax({
        url : "api/Message/"+idMessage,
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#idMessage").val(p.idMessage);
            $("#messageText").val(p.messageText);
            $("#clientSelect").val(p.client.idClient).change();
            $("#partyroomSelect").val(p.partyroom.id).change();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function updateMessage(){
    let data=getFrontMessageData();

    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : "api/Message/update",
        type : 'PUT',
        dataType : 'json',
        contentType:'application/json',
        data:dataToSend,
        success : function(p) {
            console.log(p);
            cleanFields();
            getMessage();
            $(".saveButtonJL").show();
            $(".updateButtonJL").hide();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function cancelUpdateMessage(){
    cleanFields();
    $(".saveButtonJL").show();
    $(".updateButtonJL").hide();
}
function deleteMessageById(idMessage){
    $.ajax({
        url : "api/Message/"+idMessage,
        type : 'DELETE',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            getMessage();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });

}
