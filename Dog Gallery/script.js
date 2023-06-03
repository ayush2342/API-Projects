
$(document).ready(function() {

    let getImage = document.getElementById('get-Image');
    let selectBreed= $('#dogBreed');
    let selectSubBreed = $('#dogSubBreed');
    let ImageDiv = $('#image-div')

    

    function populateBreedDropdownValues()
    {
        $.ajax(
            {
             method:'get',
             url:'https://dog.ceo/api/breeds/list/all',
             success:function(data)
             {
                 const dogBreeds=data.message

                for (const breed in dogBreeds) 
                {
                    const breedDropdownItem = `<option value="${breed}">${breed}</option>`;
                    selectBreed.append(breedDropdownItem);
                    
               }
             
             }
         
            }).fail(function(error)
            {
               console.log("Error Occured -",error)
            })
        
    }


function populateSubBreedDropdownValues()
{
    var selectedBreedoption = $(this).val();
    
    $.ajax(
        {
            method:'get',
            url:`https://dog.ceo/api/breed/${selectedBreedoption}/list`,
            success:function(data)
            {
                
                if(data.message.length>0)
                {
                    selectSubBreed.empty();
                    for(var subBreed of data.message)
                    {
                       const subBreeddropdownItem = `<option value="${subBreed}">${subBreed}</option>`;
                       selectSubBreed.append(subBreeddropdownItem);
                    }

                    selectSubBreed.removeClass('no-display');
                }
                else{
                    selectSubBreed.addClass('no-display');

                }
                
            }
        }
    ).fail(function(error)
    {
       console.log("Error Occured -",error)
    })

}

function displayImage()
{
    // ${breed}/${subBreed}
   let selectedBreed = selectBreed.val();
   let selectedSubBreed = selectSubBreed.val();
   var URL=`https://dog.ceo/api/breed/${selectedBreed}/images`;
   
   if(selectedSubBreed)
   {
    URL=`https://dog.ceo/api/breed/${selectedBreed}/${selectedSubBreed}/images`;
   }

   $.ajax(
    {
        method:'get',
        url:URL,
        success:function(data)
        {
            ImageDiv.empty();
            for(let pictures of data.message)
            {
                let newImage = `<img src="${pictures}" id="imageID" >`
                ImageDiv.append(newImage);
            }
            

        }
    }
   ).fail(function(error)
   {
      console.log("Error Occured -",error)
   })
      
}


populateBreedDropdownValues();
selectBreed.on("change",populateSubBreedDropdownValues);
getImage.addEventListener('click',displayImage)
  
  });
  

