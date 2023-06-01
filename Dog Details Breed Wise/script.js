
$(document).ready(function() {

    let getImage = document.getElementById('get-Image');
    let selectItem= $('#dogBreeds');
    let nextbutton= $('#Next')

    

    function populateDropdownValues()
    {
        $.ajax(
            {
             method:'get',
             url:'https://dog.ceo/api/breeds/list/all',
             success:function(data)
             {
                 const dogBreeds=data.message
           
                for (const breed in dogBreeds) {
                 
                 $.ajax(
                     {
                         method:'get',
                         url:`https://dog.ceo/api/breed/${breed}/list`,
                         success:function(data)
                         {
                             
                             if(data.message.length>0)
                             {
                                 for(var subBreed of data.message)
                                 {
                                    const dropdownItem = `<option value="${breed}/${subBreed}">${subBreed} ${breed}</option>`;
                                    selectItem.append(dropdownItem);
                                 }
                                 
                             }
                             else{

                                const dropdownItem = `<option value="${breed}">${breed}</option>`;
                                selectItem.append(dropdownItem);
                             }
                             
                         }
                     }
                 ).fail(function(error)
                 {
                    console.log("Error Occured -",error)
                 })
               }
             
             }
         
            }).fail(function(error)
            {
               console.log("Error Occured -",error)
            })
        
    }



function displayImage()
{
   let selectedBreed = selectItem.val();

   var URL=`https://dog.ceo/api/breed/${selectedBreed}/images`;

   $.ajax(
    {
        method:'get',
        url:URL,
        success:function(data)
        {
            ImageArray = data.message;
            $('#imageID').attr('src',ImageArray[1]);

            if ($('#imageID').attr('src') != '') {
                $('#imageID').removeClass('no-image');
            }

            nextbutton.click(function sameBreedNextImage()
            {
                let ImageURL=ImageArray[Math.floor(Math.random()*ImageArray.length)];
                $('#imageID').attr('src',ImageURL);
            })
        }
    }
   ).fail(function(error)
   {
      console.log("Error Occured -",error)
   })
   

//    
}



populateDropdownValues();
getImage.addEventListener('click',displayImage)

    
  });
  