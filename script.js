$(document).ready(function() {
//   startDragging("#box","coords");
//   drawGrid("line0");
    drawCenterLines();
});

var grid_size = 10;

function startDragging(boxName, coordName){

    $(boxName)
    .draggable({ grid: [grid_size, grid_size] })

    .resizable({ grid: [grid_size, grid_size] })

    .bind("mouseover", function() {
        $(this).addClass("move-cursor");
        showDeleteBtn(boxName);
        showColorPicker(boxName);

        logPosition(this,coordName,boxName);
    })

    .bind("mousedown", function() {
        $(this)
        .removeClass("move-cursor")
        .addClass("grab-cursor")
        .addClass("opac");

        
        $(" .text ").hide();
        // hideDeleteBtn();
        
    })

    .bind("mousemove", function(){
        // logPosition(this,coordName,boxName);
        drawLineSetup(this,boxName);
        
    })

    .bind("mouseup", function() {
        $(this)
        .removeClass("grab-cursor")
        .removeClass("opac")
        .addClass("move-cursor");

        showDeleteBtn(boxName);
        showColorPicker(boxName);
    })

    .bind("mouseleave", function(){
        clearSVG();

        hideDeleteBtn(boxName);
        hideColorPicker(boxName);
    });

}

function logPosition(obj,coordName,boxname){
    var p = $(obj);
    var offset = p.offset();

    var right = $( window ).width() - offset.left;

    adjustPosText(offset, coordName,boxname);
}

function adjustPosText(offset){
    document.getElementById("coords").innerHTML = "Left: " + offset.left + ", Top: " + offset.top;
}

function adjustPosText(offset, coords, boxname){
    // var percentage = Math.round((offset.left/($(window).width())) * 100);

    boxname = boxname.substring(1);

    var height = document.getElementById(boxname).offsetHeight;
    var width = document.getElementById(boxname).offsetWidth;

    // var right_percentage = Math.round((($(window).width() - offset.left-width)/$(window).width()) * 100);

    document.getElementById(coords).innerHTML = "Width: " + (width-4) + "<br> Height: " + (height-4);
}

var counter = 0;
function addBox(){
    var boxName = "box" + counter.toString();
    var coordID = "coords" + counter.toString();

    var box = "<div class=box-styling " + "&rdquo; id =" + boxName + "><p class=text>Drag Me</p><p class = coords id =" + coordID + "></p><button onclick=delete_btn(this) class=deletebtn  >X</button><input type=color id=boxColor name=head value=#e66465 class=colorpicker onchange=changeBoxColor(this)></div>"
    $(".boxes").append(box);

    boxName = "#" + boxName;
    // console.log(boxName);
    startDragging(boxName,coordID);

    // updateCode();
    counter = counter + 1;
}

function delete_btn(obj){
    obj.closest('div').remove();
    clearSVG()
}

function hideDeleteBtn(boxID){
    // $(".deletebtn").css("display", "none");
    $(boxID + " .deletebtn").css("display","none");
    // $(boxID + " .deletebtn").style = "display:none;";
    // console.log("It works");
}

function showDeleteBtn(boxID){
    // $(".deletebtn").css("display", "block");
    $(boxID + " .deletebtn").css("display","block");
}

function showColorPicker(boxID){
    // $(".colorpicker").css("display", "block");
    $(boxID + " .colorpicker").css("display","block");
}

function hideColorPicker(boxID){
    $(boxID + " .colorpicker").css("display","none");
}

function changeBoxColor(obj){
    console.log(obj.value);
    // obj.closest('div').style = "background-color:" + obj.value;
    $(obj.closest('div')).css("background-color", obj.value);


}

function adjustDeleteBtn(boxName){
    
    var height = document.getElementById(boxName).offsetHeight;
    var width = document.getElementById(boxName).offsetWidth;

    $(".deletebtn").css("margin-top", height-120);
    // $(".deletebtn").css("margin-left", (width/2));

}

function adjustColorPicker(boxName){
    var height = document.getElementById(boxName).offsetHeight;
    var width = document.getElementById(boxName).offsetWidth;

    $(".colorpicker").css("margin-top", height-120);
    // $(".colorpicker").css("width", width-100);

}

function drawLineSetup(obj,boxname){
    var p = $(obj);
    var offset = p.offset();

    drawObjectLines("line0", offset,boxname);
}

function drawObjectLines(boxID, offset, boxname){
    boxname = boxname.substring(1);

    var width = document.getElementById(boxname).offsetWidth;
    var height = document.getElementById(boxname).offsetHeight;

    //left line
    var xstart = offset.left;
    var ystart = offset.top+(height/2);
    var xend = 0;
    var yend = ystart;

    //top line
    var xstart2 = offset.left + (width/2);
    var ystart2 = offset.top;
    var xend2 = xstart2;
    var yend2 = 0;

    //bottom line
    var xstart3 = offset.left + (width/2);
    var ystart3 = offset.top+height;
    var xend3 = xstart3;
    var yend3 = $(window).height();


    //right line
    var xstart4 = offset.left + (width);
    var ystart4 = offset.top+(height/2);
    var xend4 = $(window).width();
    var yend4 = ystart4;


    document.getElementById(boxID).innerHTML = "<line x1=" + xstart + " y1=" + ystart + " x2=" +  xend +" y2=" + yend + ">"
    document.getElementById(boxID).innerHTML += "<line x1=" + xstart2 + " y1=" + ystart2 + " x2=" +  xend2 +" y2=" + yend2 + ">"

    document.getElementById(boxID).innerHTML += "<line x1=" + xstart3 + " y1=" + ystart3 + " x2=" +  xend3 +" y2=" + yend3 + ">"
    document.getElementById(boxID).innerHTML += "<line x1=" + xstart4 + " y1=" + ystart4 + " x2=" +  xend4 +" y2=" + yend4 + ">"

    
    //Left line text
    document.getElementById(boxID).innerHTML += "<text class = svgtext x=" + edgeLockedHori(xstart-200) + " y=" + (ystart-10) + " fill=black>" + xstart + "px (" + Math.round(((xstart/$(window).width())*100)) + "%) </text>"

    //Top line text
    document.getElementById(boxID).innerHTML += "<text class = svgtext x=" + (xstart2 + 20) + " y=" + edgeLockedVert(ystart2 - 150) + " fill=black>" + ystart2 + "px (" + Math.round(((ystart2/$(window).height())*100)) + "%) </text>"

    //Right line text
    document.getElementById(boxID).innerHTML += "<text class = svgtext x=" + edgeLockedHori(xstart4+200) + " y=" + (ystart-10) + " fill=black>" + (($(window).width() - xstart ) - width) + "px (" + Math.round((((($(window).width() - xstart ) - width)/$(window).width())*100)) + "%) </text>"

    //Box Length
    // document.getElementById(boxID).innerHTML += "<line x1=" + (offset.left + 10)+ " y1=" + (offset.top+10) + " x2=" +  (offset.left + width - 10) +" y2=" + (offset.top + 10) + " >"

    //Box Height
    // document.getElementById(boxID).innerHTML += "<line x1=" + (offset.left - 10)+ " y1=" + (offset.top+10) + " x2=" +  (offset.left - 10) +" y2=" + (offset.top + height -10) + " >"

    //Bottom line text
    document.getElementById(boxID).innerHTML += "<text class = svgtext x=" + (xstart+(width/2) + 10) + " y=" + edgeLockedVert(ystart3 + 150) + " fill=black >" + (($(window).height() - ystart2)-(height)) + "px (" + Math.round((((($(window).height() - ystart2)-(height))/$(window).height())*100)) + "%) </text>"

    adjustDeleteBtn(boxname);
    adjustColorPicker(boxname);
    drawCenterLines();
    
}

function edgeLockedHori(value){
    var win_width = $(window).width();

    if(value < 0){
        return 20;
    }else if(value > win_width-100){
        return (win_width-120);
    }else{
        return value;
    }
}

function edgeLockedVert(value){
    var win_height = $(window).height();

    if(value < 0+20){
        return 40;
    }else if(value > win_height-10){
        return (win_height-20);
    }
    else{
        return value;
    }
}

function drawCenterLines(){
    //center vertical line
    document.getElementById("line0").innerHTML += "<line x1=" + ($(window).width()/2) + " y1=" + 0 + " x2=" +  ($(window).width()/2) +" y2=" + ($(window).height()) + " stroke-dasharray=4>"

    //center horizontal line
    document.getElementById("line0").innerHTML += "<line x1=" + 0 + " y1=" + ($(window).height()/2) + " x2=" +  ($(window).width()) +" y2=" + ($(window).height()/2) + " stroke-dasharray=4>"
}

function clearSVG(){
    document.getElementById("line0").innerHTML = "";
    console.log("Test");

    drawCenterLines();
}

function drawGrid(boxID){
    var gridSize = 10;
    var divisions = $(window).width();

    for(let i = 0; i < divisions; i+= 10){
        document.getElementById(boxID).innerHTML += "<line x1=" + i + " y1=" + 0 + " x2=" +  i +" y2=" + $(window).height() + ">"
        document.getElementById(boxID).innerHTML += "<line x1=" + 0 + " y1=" + i + " x2=" +  $(window).width() +" y2=" + i + ">"
    }
}

function updateCode(){
    document.getElementById("code").innerHTML += "\n\nwidth: 200px; \nbackground-color: #54cfb3; \npadding: 30px; \nborder: 2px solid black; \nposition: fixed; \ndisplay: inline-block;</code></pre>"
}