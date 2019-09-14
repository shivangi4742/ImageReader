function readURL(input) {
   console.log(input.files[0].name);
  if (input.files && input.files[0]) {

      var reader = new FileReader();
      reader.onload = function (e) {
          $('#uploaded')
              .attr('src', e.target.result)
      };
      reader.readAsDataURL(input.files[0]);
  }
  const formData = new FormData();
 
  formData.append('file', input.files[0].name);
  $.ajax({
    type: "POST",
    timeout: 50000,
    url: "http://localhost:8000/upload",
    data: formData,
    enctype: 'multipart/form-data',
    success: function (data) {
        alert('success');
        return false;
    }
});
  
}

const stage=Jcrop.attach('uploaded', {
  shadeColor: 'green'
});

stage.listen('crop.change',(widget,e) => {
const coords=widget.pos;
console.log(coords)
document.getElementById('coords').innerHTML="Top left: ("+coords.x+","+coords.y+") "+"Top right: ("+coords.x2+","+coords.y2+")<br>Properties: "+"Width: "+coords.w+", Height: "+coords.h+", Aspect ratio: "+Math.round(coords.aspect * 100) / 100;
});