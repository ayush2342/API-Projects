
$(document).ready(function()
{
    let marSolbox = $('#MarsSol');
    let imageClick = $('#get-Image');
    let ImageDiv = $('#image-div')

    let backButton=$('#back-button')
    let nextButton=$('#next-button')
    let pageNumber;
    let marsSol;

    function loadImages()
    {
       
        marsSol = marSolbox.val()
        pageNumber=1;

      if(marsSol)

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
                    
                    nextButton.removeAttr("disabled");

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
          window.alert("Please enter value in the input sol field")
      }
      
    }

    function nextPageImages()
    {
        pageNumber++

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
                     ImageDiv.empty();
                    for(let pictures of data.photos)
                    {
                        let newImage = `<img src="${pictures.img_src}" id="imageID" >`
                        ImageDiv.append(newImage);
                    }
                }

            }
        )

        pageNumber++;
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
                        nextButton.prop("disabled", true);
                    }

                    pageNumber--;

                }

            }
        )
        backButton.removeAttr("disabled");
    }

    function previousPageImages()
    {
        pageNumber--;
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
                     ImageDiv.empty();
                    for(let pictures of data.photos)
                    {
                        let newImage = `<img src="${pictures.img_src}" id="imageID" >`
                        ImageDiv.append(newImage);
                    }
                }

            }
        )
                    pageNumber--;
                    if(pageNumber<1)
                    {
                        backButton.prop("disabled", true);
                    }

                    pageNumber++;
                    nextButton.removeAttr("disabled");
                    
    }
  

    imageClick.click(loadImages);
    nextButton.click(nextPageImages);
    backButton.click(previousPageImages);
    
})