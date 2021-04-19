const home_featured = [];
const featured_shows = [];

$(document).ready(function(){
        $.ajax({
            url : "../proccess/featured.php",
            type : "POST",
            data : {type:'home',action:'get'},
            success : function(data)
            {
                if(data == '0')
                {
                    $('#home-featured').html("<button class='btn btn-primary mx-auto'>Empty</button>");
                }
               addFeaturedDataToArray(data,'home');
            }
        });

        $.ajax({
            url : "../proccess/featured.php",
            type : "POST",
            data : {type:'featured',action:'get'},
            success : function(data)
            {
                if(data == '0')
                {
                    $('#home-featured').html("<button class='btn btn-primary mx-auto'>Empty</button>");
                }
               addFeaturedDataToArray(data,'featured');
            }
        });
});

function addFeaturedDataToArray(data,type){
    let response = JSON.parse(data);

        if(type=='home')
        {
            response.forEach(ele=>{
            home_featured.push(ele);
            });
            let content = displayFeaturedData(home_featured,type);
            if(home_featured.length<5)
            {
                content+=`<div class="add-more-wrapper">
                <button class='btn btn-primary add-more' id='add-more-home'>Add more</button>
                </div>`;
            }
            $('#home-featured').html(content);
        }else{
            response.forEach(ele=>{
            featured_shows.push(ele);
            });
            let content = displayFeaturedData(featured_shows,type);
            if(featured_shows.length<10)
            {
                content+=`<div class="add-more-wrapper">
                <button class='btn btn-primary add-more' id='add-more-featured'>Add more</button>
                </div>`;
            }
            $('#featured-shows').html(content);
        }
}

function displayFeaturedData(response,feature){
    let output = '';
    response.forEach(ele=>{
        output+=`<div class='feature-card'>
        <div class='feature-image'>
            <i class='fa fa-times remove-feature' data-id='${ele.id}' data-type='${ele.type}' data-feature='${feature}'></i>
            <img src='${ele.thumbnail}' alt=''>
        </div>
        <div class='feature-detail'>
            <span class='feature-name'>${ele.title}</span>
            <span class='feature-type'>${ele.release_year}</span>
            <span class='banner-label'>${ele.type}</span>
        </div>
    </div>`;
    });
    return output;
}

// SELECT the part of the movie
$(document).on('change','.feature-type',function(){
    let type = $(this).val();
    let feature = $(this).data('feature');
    let part = 1;
    let language = 0;
    let search = '';

    if(type != 0)
    {
        $('#search-parts').attr('data-type',type);
        $('#search-parts').attr('data-feature',feature);
        $('.part-selection-wrapper').css('display','flex');
        $.ajax({
            url : "../proccess/add-next-part-movie.php",
            type : "POST",
            data : {part,language,search,type},
            success : function(data)
            {
                getMoviesOnSearch(part,search,language,data,type,feature);
            }
        });
    }
});

// Change the part of the movie
$(document).on('click','#search-parts',function(){
    let part = $('.movie-part').val();
    let search = $('#search-part-title').val();
    let language = $('#language').val();
    let type = $(this).data('type');
    let feature = $(this).data('feature');
        $('.part-selection-wrapper').css('display','flex');
        $.ajax({
            url : "../proccess/add-next-part-movie.php",
            type : "POST",
            data : {part,search,language,type},
            success : function(data)
            {
                getMoviesOnSearch(part,search,language,data,type,feature);
            }
        });
});

// Get all movies while on change or search of button and show in UI 
function getMoviesOnSearch(part,search,language,data,type,feature){
        let output = '';
        let response = JSON.parse(data);
        $('#part-number').text(`'${(part==0)? 'Any':part}' > search '${(search==0)? ' ':search}' > language '${(language==0)? 'All':language}'`);
        $('.movie-part:eq(0)').val(part);
        
        if(response.length > 0)
        {
            if(type == 'movie')
            {
                response.forEach((element) => {
                    output += `<div class='movie-card' data-title='${element.title}' data-feature='${feature}' data-type='movie' data-id='${element.id}'>
                            <div class='movie-image'>
                                <img src='${element.thumbnail}'>
                            </div>
                            <div class='movie-info'>
                                <span>${element.language}</span>
                                <span>${element.title} (part ${element.part})</span>
                            </div>
                        </div><!---movie-card-->`;
                });
            }else if(type == 'webseries')
            {
                response.forEach((element,index) => {
                    output += `<div class='movie-card' data-title='${element.title}' data-feature='${feature}' data-type='webseries' data-id='${element.id}'>
                            <div class='movie-image'>
                                <img src='${element.thumbnail}'>
                            </div>
                            <div class='movie-info'>
                                <span>${element.language}</span>
                                <span>${element.title} (season ${element.season_number})</span>
                            </div>
                        </div><!---movie-card-->`;
                });
            }else if(type == 'episode')
            {
                response.forEach((element,index) => {
                    output += `<div class='movie-card' data-title='${element.title}' data-feature='${feature}' data-type='episode' data-id='${element.id}'>
                            <div class='movie-image'>
                                <img src='${element.thumbnail}'>
                            </div>
                            <div class='movie-info'>
                                <span>${element.language}</span>
                                <span>${element.title} (S0${element.season_number}E0${element.episode_number})</span>
                            </div>
                        </div><!---movie-card-->`;
                });
            }
        }else{
            output += `<div class='my-auto'>
            <span class='btn btn-primary'>No search result found</span>
            </div>`;
        }
        $('.all-movies-holder').html(output);
}

// Close the modal opened for parts
$(document).on('click','#close-parts',function(){
    clearFiled();
});

// Close the modal opened for parts
$(document).on('click',function(e){
    if(e.target.classList.contains('part-selection-wrapper'))
    {
        clearFiled();
    }
});
// Clear the field after closing movies modal
function clearFiled() {
        $('.part-selection-wrapper').css('display','none');
        $('.movie-part:eq(0)').val('0');
        $('#search-part-title').val('');
        $('#language').val('0');
}

$(document).on('click','.movie-card',function(){
    let feature = $(this).data('feature');
    let title = $(this).data('title');
    let id = $(this).data('id');
    if(feature == 'home')
    {
        $('.selcted-home').removeClass('d-none');
        $('.selcted-home').attr('data-id',id);
        $('.selcted-home').html(`<span>${title}</span><i class='fa fa-times delete-category'></i>`);
    }else if(feature == 'featured')
    {
        $('.selcted-featured').removeClass('d-none');
        $('.selcted-featured').attr('data-id',id);
        $('.selcted-featured').html(`<span>${title}</span><i class='fa fa-times delete-category'></i>`);
    }
    clearFiled();
});

$(document).on('click','.delete-category',function(){
    $(this).parent().addClass('d-none');
});

$(document).on('click','.remove-feature',function(){
    let id = $(this).data('id');
    let type = $(this).data('type');
    let feature = $(this).data('feature');
    let action = 'delete';
    let ele = $(this);

    if(confirm("Do you want to remove this from "+feature+" shows?"))
    {
        $.ajax({
            url : "../proccess/featured.php",
            type : "POST",
            data : {type,action,id,feature},
            success : function(data)
            {
                ele.parent().parent().remove();
                if(feature == 'home')
                {
                    for(let i = 0;i<home_featured.length;i++)
                    {
                        if(id == home_featured[i].id)
                        {
                            home_featured.splice(i,1);
                        }
                    }
                }else if(feature == 'featured')
                {
                    for(let i = 0;i<featured_shows.length;i++)
                    {
                        if(id == featured_shows[i].id)
                        {
                            featured_shows.splice(i,1);
                        }
                    }
                }
            }
        });
    }
});

$(document).on('click','#add-more-home',function(){
    $('#home-featured-more').css('display','flex');
});

$(document).on('click','#add-more-featured',function(){
    $('#featured-show-more').css('display','flex');
});