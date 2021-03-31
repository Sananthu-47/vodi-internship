$(document).ready(function() {
    let pathname = window.location.pathname;

    if(checkCurrentTab(pathname)){
        for(let i=0;i<$('.side-nav').children().length;i++)
        {
            if($('.side-nav').children()[i].href==="http://localhost"+pathname)
            {
                $('.side-nav').children().children()[i].classList.add('active-nav');
            }else if($('.side-nav').children().children()[i].classList.contains('active-nav')){
            $('.side-nav').children().children()[i].classList.remove('active-nav');
            }
        }
    }

});

function checkCurrentTab(pathname){
    let count = 0;
    for(let i=0;i<$('.side-nav').children().length;i++){
        if($('.side-nav').children()[i].href==="http://localhost"+pathname)
        {
            count++;
        }
    }
    if(count>0)
    {
        return true;
    }else{
        return false;
    }
}

$('#menubar').on('click',function(){
    $('.navbar').toggle();
});

// Get add users content page by ajax call
$('#add-user').on('click',function(e){
    clearActiveNav();
    $(this).addClass('active-background');

    $.ajax({
        url : "../proccess/admin-add-user.php",
        type : "POST",
        success : function(data){
            $('.main-content').html(data);
        }
    });
});

// Get all users with a ajax call
$('#user-list').on('click',function(e){
    clearActiveNav();
    $(this).addClass('active-background');

    $.ajax({
        url : "../proccess/admin-user-list.php",
        type : "POST",
        success : function(data){
            $('.main-content').html(data);
        }
    });
});

// Get all videos with a ajax call
$('#video-list').on('click',function(e){
    clearActiveNav();
    $(this).addClass('active-background');

    $.ajax({
        url : "../proccess/admin-all-videos.php",
        type : "POST",
        success : function(data){
            $('.admin-main-content').html(data);
        }
    });
});

// Get add movie page with a ajax call
$('#add-movie').on('click',function(e){
    clearActiveNav();
    $(this).addClass('active-background');

    $.ajax({
        url : "../proccess/admin-add-movie.php",
        type : "POST",
        success : function(data){
            $('.admin-main-content').html(data);
        }
    });
});

// Get all live movies with a ajax call
$('#live-movie').on('click',function(e){
    clearActiveNav();
    $(this).addClass('active-background');

    $.ajax({
        url : "../proccess/admin-live-movie.php",
        type : "POST",
        success : function(data){
            $('.admin-main-content').html(data);
        }
    });
});

// Get Add webseries page with a ajax call
$('#add-webseries').on('click',function(e){
    clearActiveNav();
    $(this).addClass('active-background');

    $.ajax({
        url : "../proccess/admin-add-webseries.php",
        type : "POST",
        success : function(data){
            $('.admin-main-content').html(data);
        }
    });
});

// Get all live webseries page with a ajax call
$('#live-webseries').on('click',function(e){
    clearActiveNav();
    $(this).addClass('active-background');

    $.ajax({
        url : "../proccess/admin-live-webseries.php",
        type : "POST",
        success : function(data){
            $('.admin-main-content').html(data);
        }
    });
});

// Get all advertisement videos with a ajax call
$('#advertisement-list').on('click',function(e){
    clearActiveNav();
    $(this).addClass('active-background');

    $.ajax({
        url : "../proccess/admin-list-of-advertisement.php",
        type : "POST",
        success : function(data){
            $('.admin-main-content').html(data);
        }
    });
});

// Get add advertisement page with a ajax call
$('#add-advertisement').on('click',function(e){
    clearActiveNav();
    $(this).addClass('active-background');

    $.ajax({
        url : "../proccess/admin-add-advertisement.php",
        type : "POST",
        success : function(data){
            $('.admin-main-content').html(data);
        }
    });
});

// Get all payments page with a ajax call
$('#payment-list').on('click',function(e){
    clearActiveNav();
    $(this).addClass('active-background');

    $.ajax({
        url : "../proccess/admin-list-of-payment.php",
        type : "POST",
        success : function(data){
            $('.admin-main-content').html(data);
        }
    });
});

// Get update payment page with a ajax call
$('#update-payment').on('click',function(e){
    clearActiveNav();
    $(this).addClass('active-background');

    $.ajax({
        url : "../proccess/admin-update-payments.php",
        type : "POST",
        success : function(data){
            $('.admin-main-content').html(data);
        }
    });
});

// Clear the active subnavs
function clearActiveNav(){
    $('.content-nav-badges').each(function(i,ele){
        $(ele).removeClass('active-background');
    });
}

// Register a user
$(document).on('click','#user-register',function(e){
    e.preventDefault();
    let username = $('#user-name').val();
    let email = $('#user-email').val();
    let mobile_number = $('#user-number').val();
    let password = $('#user-password').val();
    let role = $('#role').val();
    $.ajax({
        url : "../../process/register.php",
        type : "POST",
        data : {username,email,mobile_number,password,role},
        success : function(data)
        {
            if(data == 4)
            {
                alert('User already registered');
            }else if(data == 5)
            {
                alert('Success');
            }else{
                register_validation(data);
            }
        }
    });
});

// Validate the data to check any empty form fields
function register_validation(data){
    let data_array = JSON.parse(data);
    const element_array = [$('#user-name'),$('#user-email'),$('#user-number'),$('#user-password')];

    element_array.forEach(ele=>{
        ele.css('border','1px solid #b9b9b9');
    });
    
    data_array.forEach((ele)=>{
        element_array[ele].css('border','1px solid red');
    });
}

//Add category to the UI
let category_array = [];
let category_array_db = [];
$(document).on('click','#add-category',function(e){
    let output = '';
    e.preventDefault();
    let category = String($('#category-select option:selected').text());
    
    if(!category_array.includes(category))
    {
        if($('#category-select').val() != 0)
        {
            category_array.push(category);
            category_array_db.push($('#category-select').val());
            $('.selected-categories').css('display','flex');
        }else{
            alert('Select a category before adding');
        }
    }else{
        alert('Category '+category+" is already added");
    }
    category_array.forEach((ele,i)=>{
        output += "<div class='category-tags'><span>"+ele+"</span><i class='fa fa-times delete-category' data-category-id='";
        output += category_array_db[i];
        output+="'></i></div>";
    });
    $('.selected-categories').html(output);
    $('#category-select').val(0);
});

// Remove selected categories from array and UI
$(document).on('click','.delete-category',function(e){
    $(this).parent().remove();
        let removeItemDb = $(this).data('category-id');
                category_array_db = $.grep(category_array_db, function(value) {                    
                return value != removeItemDb;
                });

        let removeItem = $(this).parent().children()[0].innerText;
                category_array = $.grep(category_array, function(value) {
                return value != removeItem;
                });
            if(category_array.length<1)
                {
                    $('.selected-categories').css('display','none');
                }
});

// Add movie to db
$(document).on('click','#publish-movie',function(e){
    e.preventDefault();
    let title = $('#movie-title').val();
    let age = $('#movie-age').val();
    let thumbnail = $('#movie-thumbnail').val();
    let description = $('#movie-description').val();
    let status = $('#movie-status').val();
    let year = $('#movie-year').val();
    let part = $('#movie-part').val();
    let part_1 = 0;
    let movie_link = $('#movie-link').val();
    let movie_iframe = $('#movie-iframe').val();
    let duration = $('#movie-duration').val();
    let language = $('#movie-language').val();

    $.ajax({
        url : "../proccess/publish-movie.php",
        type : "POST",
        data : {title,age,thumbnail,description,status,year,part,part_1,movie_link,movie_iframe,duration,language,category_array_db},
        success : function(data)
        {
            if(data=="success")
            {
                $('#live-movie').click();
            }else{
                check_add_movies(data);
            }
        }
    });
});


// Validate the data to check any empty form fields
function check_add_movies(data){
    let data_array = JSON.parse(data);
    const element_array = [$('#movie-title'),$('#movie-age'),$('#movie-thumbnail'),$('#movie-description'),$('#movie-status'),$('#movie-year'),$('#movie-part'),$('.movie-link-input'),$('#movie-duration'),$('#movie-language'),$('#category-select')];

    element_array.forEach(ele=>{
        ele.css('border','1px solid #b9b9b9');
    });
    
    data_array.forEach((ele)=>{
        element_array[ele].css('border','1px solid red');
    });
}

$(document).on('click','#video-link',function(){
    $('#video-iframe').removeClass('current-link');
    $(this).addClass('current-link');
    $('#movie-link').removeClass('d-none');
    $('#movie-iframe').addClass('d-none');
    $('#movie-iframe').val('');
});

$(document).on('click','#video-iframe',function(){
    $('#video-link').removeClass('current-link');
    $(this).addClass('current-link');
    $('#movie-link').addClass('d-none');
    $('#movie-iframe').removeClass('d-none');
    $('#movie-link').val('');
});