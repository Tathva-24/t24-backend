module.exports={
    "routes": [
        {
            method: 'GET',
            path:'/workshops/slug/:slug',
            handler: "workshop.findwithSlug"
        }
    ]  
}
