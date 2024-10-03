module.exports={
    "routes": [
        {
            method: 'GET',
            path:'/competitions/slug/:slug',
            handler: "competition.findwithSlug"
        }
    ]
}
