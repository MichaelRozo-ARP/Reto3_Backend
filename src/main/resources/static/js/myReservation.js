$(document).ready(function (){
    getClientList();
    getPartyroomList();
    getMessage();
});
function getFrontReservationData(){
    let k={
        idReservation:$("#idResevation").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
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
    $("#idResevation").val("");
    $("#startDate").val("");
    $("#devolutionDate").val("");
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
function saveReservation(){
    let data=getFrontReservationData();
    data.id=null;
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : "api/Reservation/save",
        type : 'POST',
        dataType : 'json',
        contentType:'application/json',
        data:dataToSend,
        success : function(p) {
            console.log(p);
            cleanFields();
            getReservation();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function getReservation(){
    $.ajax({
        url : "api/Reservation/all",
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#results").empty();
            let l="";
            for (let i=0;i<p.length;i++){
                l+=`<div class="col">
                        <div class="card"><div class="card-header">
                                    <h5 class="card-text">Salon: ${p[i].partyroom.name}</h5>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Cliente: ${p[i].client.name}</p>
                                    <p class="card-text">Fecha Inicio: ${p[i].startDate}</p>
                                    <p class="card-text">Fecha Devolucion: ${p[i].devolutionDate}</p>
                                </div>
                                <div class="card-footer">
                                      <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-outline-primary" onclick='getReservationById(${p[i].idReservation})'>Actualizar</button>
                                        <button type="button" class="btn btn-outline-primary" onclick='deleteReservationById(${p[i].idReservation})'>Borrar!</button>
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
function getReservationById(idReservation){
    $(".saveButtonJL").hide();
    $(".updateButtonJL").show();
    $.ajax({
        url : "api/Reservation/"+idReservation,
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#idResevation").val(p.idReservation);
            $("#startDate").val(p.startDate);
            $("#devolutionDate").val(p.devolutionDate);
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
function updateReservation(){
    let data=getFrontReservationData();

    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : "api/Reservation/update",
        type : 'PUT',
        dataType : 'json',
        contentType:'application/json',
        data:dataToSend,
        success : function(p) {
            console.log(p);
            cleanFields();
            getReservation();
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
function cancelUpdateReservation(){
    cleanFields();
    $(".saveButtonJL").show();
    $(".updateButtonJL").hide();
}
function deleteReservationById(idReservation){
    $.ajax({
        url : "api/Reservation/"+idReservation,
        type : 'DELETE',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            getReservation();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });

}