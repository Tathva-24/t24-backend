module.exports={
    "routes": [
        {
            method: 'GET',
            path:'/lectures/slug/:slug',
            handler: "lecture.findwithSlug"
        }
    ]
}
