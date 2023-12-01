const express= require("express");
const app=express();
const path=require("path")
const methodOverride=require('method-override')
const { v4: uuid } = require('uuid');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true})) //body parsing middleware to access the data recieved by the post request
app.use(express.static(path.join(__dirname,'public')))
app.use(methodOverride('_method'))

let blogs=[
    {
        id:uuid(),
        blog:"You might remain sealed in strict retreat for months or even years,But if you fail to make any progress in the state of your mind,Aren't you just bragging about all the hardships and deprivation?",
        name:"~Lord Buddha"

    },
    {
        // id:1,
        id:uuid(),
        blog:"You might remain sealed in strict retreat for months or even years,But if you fail to make any progress in the state of your mind,Aren't you just bragging about all the hardships and deprivation?",
        name:"~Lord Buddha"

    },
    {
        // id:2,
        id:uuid(),
        blog:"You might remain sealed in strict retreat for months or even years,But if you fail to make any progress in the state of your mind,Aren't you just bragging about all the hardships and deprivation?",
        name:"~Lord Buddha"

    },
    {
        // id:3,
        id:uuid(),
        blog:"You might remain sealed in strict retreat for months or even years,But if you fail to make any progress in the state of your mind,Aren't you just bragging about all the hardships and deprivation?",
        name:"~Lord Buddha"

    },
    {
        // id:4,
        id:uuid(),
        blog:"You might remain sealed in strict retreat for months or even years,But if you fail to make any progress in the state of your mind,Aren't you just bragging about all the hardships and deprivation?",
        name:"~Lord Buddha"

    },
    {
        // id:5,
        id:uuid(),
        blog:"You might remain sealed in strict retreat for months or even years,But if you fail to make any progress in the state of your mind,Aren't you just bragging about all the hardships and deprivation?",
        name:"~Lord Buddha"

    }

]





//home page
app.get('/',(req,res)=>{
    res.send("<h1>welcome to our blogs website</h1>")
    
})

//display all blogs
app.get('/blogs',(req,res)=>{
    res.render('index',{blogs})
})

//form to add new blog
app.get('/blogs/new',(req,res)=>{
    res.render('new');
})
//display the new blog added 
app.post('/blogs',(req,res)=>{

    const {blog,name}=req.body;
    blogs.push({blog,name,id:blogs.length})
    res.redirect('/blogs');
})

//show a particular blog
app.get('/blogs/:blogId',(req,res)=>{
    let {blogId}=req.params;
    let found_blog=blogs.find((item)=>{return item.id==blogId})
    res.render('show',{found_blog})
})

//Edit Form
app.get('/blogs/:blogId/edit',(req,res)=>{
    let {blogId}=req.params;
    let found_blog=blogs.find((item)=>{return item.id==blogId})
    res.render('edit',{found_blog});
})

//Update the edited comment 
app.patch('/blogs/:blogId',(req,res)=>{ // post request cannot be used here because it will create a new comment.

    //for updation/edit we use put and patch..
    //put is used to change the entire data(all the fields are changed) whereas patch is used to make partial changes.

    let {blogId}=req.params;
    let found_blog=blogs.find((item)=>{return item.id==blogId})

    console.log(found_blog); 
    console.log(req.body);

    const {edit_blog}=req.body;
    found_blog.blog=edit_blog;
    res.redirect('/blogs');
    

    // res.send('Edited Successfully');
})



app.delete('/blogs/:blogId',(req,res)=>{

    const{blogId}=req.params;
    const new_blog_array=blogs.filter((item)=> item.id!=blogId)

    blogs=new_blog_array;
    res.redirect('/blogs');
})







// app.get('/user',(req,res)=>{
//     console.log(req.query);
//     res.send("Get request accepted");
// })

// app.post('/user',(req,res)=>{
//     console.log(req.query)  
//     console.log(req.body)  //by default--> undefined ,so middleware is used to access that data
//     //all the data is wrapped inside the body object
//     res.send("post request accepted");
// })


app.listen(8080,()=>{
    console.log("Server Listening at port 8080");
})