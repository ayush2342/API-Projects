
  $(document).ready(function()
  {
    let datebox=$("#datepicker");
    $(function() {
        datebox.datepicker({
            dateFormat: "yy-mm-dd",
            maxDate: "0"
        });
      });

      let imageClick = $('#get-Image');
      let ImageDiv = $('#image-div')
    
    
      imageClick.click(function()
      {
        let date=datebox.val();

        if(date)
        {
            $.ajax(
                {
                    url:'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos',
                    method:'get',
                    data:
                    {
                        earth_date:date,
                        api_key:'FW6SPwj4WcoTFeqxkgV2EXaKe7xujSYTyQXJsliT'
                    },
                    success:function(data)
                    {
                        if(data.photos.length==0)
                        {
                            window.alert("Images not yet uploaded by NASA for the selected Date. Please select any previous dates");
                            return;
                        }
                        ImageDiv.empty();
                        for(let pictures of data.photos)
                        {
                            let newImage = `<img src="${pictures.img_src}" id="imageID" >`
                            ImageDiv.append(newImage);
                        }
                    }

                }
            ).fail(function(error)
            {
               console.log("Error Occured -",error)
            })

        }
        else 
        {
            window.alert("Please enter Date")
        }
        
      })
      
  })