
$(document).ready(function()
{
    let imageClick = $('#get-Image');
    let ImageDiv = $('#image-div')
    let headerDiv=$('#date-div')

    
    imageClick.click(function()
    {
        headerDiv.addClass('no-display');
      
        
        $.ajax(
            {
                url:'https://api.codingninjas.com/api/v3/courses',
                method:'get',
                success:function(data)
                {
                    let courses = data.data.courses;

                    for(let course of courses)
                    {
                        if(course.preview_image_url)
                        {
                            let name=course.name;
                            let level=course.level;
                            let imageURL=course.preview_image_url

                            let newCourse = `<div class="images">
                            <img src="${imageURL}" alt="">
                            <p>${name}</p>
                            <p>${level}</p>
                                        </div>`
                            ImageDiv.append(newCourse);
                        }
                    }
                }

            }
        ).fail(function(error)
        {
            console.log("Error Occured -",error)
        })
      
    })
    
})