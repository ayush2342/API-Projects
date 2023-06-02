
$(document).ready(function()
{
    let marSolbox = $('#MarsSol');
    let pageNumberbox = $('#pageNumber')
    let imageClick = $('#get-Image');
    let ImageDiv = $('#image-div')
  
  
    imageClick.click(function()
    {
      let marsSol = marSolbox.val();
      let pageNumber = pageNumberbox.val();

      if(marsSol&&pageNumber)

      {
        if(marsSol<1||marsSol>1000)
        {
            window.alert("Please enter Sol Value between 1 and 1000");
            return;
        }
          $.ajax(
              {
                  url:'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos',
                  method:'get',
                  data:
                  {
                      sol:marsSol,
                      page:pageNumber,
                      api_key:'FW6SPwj4WcoTFeqxkgV2EXaKe7xujSYTyQXJsliT'
                  },
                  success:function(data)
                  {
                      if(data.photos.length==0)
                      {
                          window.alert(`Following sol does not have ${pageNumber} pages.Please enter a appropriate value`);
                          return;
                      }
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
          window.alert("Please enter values in both input fields")
      }
      
    })
    
})