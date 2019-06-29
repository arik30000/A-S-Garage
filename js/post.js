 <script>
  
$(document).ready(function(){
    $("#Login").on("submit",function(e) {
        $.ajax({
            type: "POST",
            data: $("#Login").serialize(),//serializes the form's elements
            success:function(data)
            {
              if(req.body.usrname=="admin@gmail.com"&&req.body.psw=="Admin1!")
              {
                  alert(data.response);
                return res.redirect('/contact-us'); //get response from server
              }
            }
        });
       // e.preventDefault();// avoiding from actual submit of form

    })
});
  </script>