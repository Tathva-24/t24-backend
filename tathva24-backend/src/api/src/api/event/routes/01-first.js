module.exports={
    "routes": [
        {
            method: 'GET',
            path:'/events/slug/:slug',
            handler: "event.findwithSlug"
        }
    ]
}
