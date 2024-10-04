module.exports = (plugin) => {
    plugin.controllers.user.find = async (ctx) => {
        return ctx.unauthorized()
    }

    plugin.controllers.user.findOne = async (ctx) => {

        if (ctx.state.user.id != ctx.request.params.id) {
            return ctx.unauthorized()
        }

        const data = await strapi.entityService.findOne('plugin::users-permissions.user', ctx.request.params.id, {
            populate: "*"
        });

        delete data.createdBy
        delete data.updatedBy
        delete data.password
        delete data.role

        return data
    }
    plugin.controllers.user.update = async (ctx) => {

        if (ctx.state.user.id != ctx.request.params.id) {
            return ctx.unauthorized()
        }

        const data = await strapi.entityService.update('plugin::users-permissions.user', ctx.request.params.id, {
            data: ctx.request.body,
            populate: "*"
        });

        delete data.createdBy
        delete data.updatedBy
        delete data.password
        delete data.role

        return data
    }

    plugin.controllers.user.newMethod = async (ctx) => {
        const { user } = ctx.state;
        if (!user) {
            return ctx.unauthorized();
        }
        const userObj = await strapi.entityService.findOne('plugin::users-permissions.user', user.id, {
            populate: '*'
        });
        const filtered = {
            id: userObj.id,
            email: userObj.email,
            name: userObj.name,
            phone: userObj.phone,
            tathvaId: userObj.tathvaId,
            college: userObj.college,
            year: userObj.year,
            state: userObj.state,
            district: userObj.district,
            refCode: userObj.refCode,
            registeredEvents: userObj.registeredEvents,
            registeredWorkshops: userObj.registeredWorkshops,
            registeredLectures: userObj.registeredLectures,
            registeredCompetitions: userObj.registeredCompetitions,
            accomodation: userObj.bookedAccomodation,
            gender: userObj.gender,
            hostel: userObj.hostel,
            branch: userObj.branch

        };


        const workshops = [], lectures = [], events = [], competitions = []

        for (let detail of filtered.registeredCompetitions) {
            try {
                let userCompetitionsObj = await strapi.entityService.findOne('api::user-competitions-detail.user-competitions-detail', detail.id, {
                    populate: "*"
                })
                let competitionObj = await strapi.entityService.findOne("api::competition.competition", userCompetitionsObj.competition.id, {
                    populate: "*"
                })

                const filteredCompetition = {
                    id: competitionObj.id,
                    name: competitionObj.title,
                    coverImage: competitionObj.coverImage?.url,
                    slug: competitionObj.slug,
                    verified: userCompetitionsObj.verifed,
                    reciept: userCompetitionsObj.receipt?.url,
                    data: userCompetitionsObj.data,
                    refCode: userCompetitionsObj.refCode,
                    userCompetitionId: userCompetitionsObj.id
                };


                competitions.push(filteredCompetition)

            } catch (err) {
                console.log(err)
            }

        }

        for (let detail of filtered.registeredEvents) {
            try {
                let userEventObj = await strapi.entityService.findOne('api::user-event-detail.user-event-detail', detail.id, {
                    populate: "*"
                });
                let eventObj = await strapi.entityService.findOne("api::event.event", userEventObj.event.id, {
                    populate: "*"
                })
                const filteredEvent = {
                    id: eventObj.id,
                    name: eventObj.name,
                    coverImage: eventObj.coverImage,
                    slug: eventObj.slug,
                    verified: userEventObj.verifed,
                    teamMembers: userEventObj.teamMembers,
                    reciept: userEventObj.receipt?.url,
                    userResponses: userEventObj.userResponses,
                    refCode: userEventObj.refCode,
                };
                events.push(filteredEvent)
            } catch (err) {
                console.log(err)
            }
        }

        for (let detail of filtered.registeredWorkshops) {
            try {
                let userWorkshopObj = await strapi.entityService.findOne('api::user-workshop-detail.user-workshop-detail', `${detail.id}`, {
                    populate: "*"
                });
                let workshopObj = await strapi.entityService.findOne("api::workshop.workshop", userWorkshopObj.workshop.id, {
                    populate: "*"
                })
                const filteredWorkshop = {
                    id: workshopObj.id,
                    name: workshopObj.name,
                    coverImage: workshopObj.coverImage?.url,
                    slug: workshopObj.slug,
                    verified: userWorkshopObj.verifed,
                    reciept: userWorkshopObj.receipt?.url,
                    data: userWorkshopObj.data,
                    refCode: userWorkshopObj.refCode
                };
                workshops.push(filteredWorkshop)
            } catch (err) {
                console.log(err)
            }
        }

        for (let detail of filtered.registeredLectures) {
            let userLectureObj = await strapi.entityService.findOne('api::user-lecture-detail.user-lecture-detail', detail.id, {
                populate: "*"
            });
            let lectureObj = await strapi.entityService.findOne("api::lecture.lecture", userLectureObj.lecture.id, {
                populate: "*"
            })
            const filteredLecture = {
                id: lectureObj.id,
                name: lectureObj.name,
                coverImage: lectureObj.coverImage?.url,
                slug: lectureObj.slug,
                verified: userLectureObj.verified,
                receipt: userLectureObj.receipt?.url,
                data: userLectureObj.data,
                refCode: userLectureObj.refCode
            };
            lectures.push(filteredLecture)
        }
        let accomodation;
        if (filtered?.accomodation) {
            let accObj = await strapi.entityService.findOne('api::user-accomodation-detail.user-accomodation-detail', filtered?.accomodation?.id, {
                populate: "*"
            });
            delete accObj.user
            delete accObj.updatedBy
            delete accObj.updatedAt

            accomodation = accObj
        }


        const temp = {
            ...filtered,
            registeredEvents: events,
            registeredLectures: lectures,
            registeredWorkshops: workshops,
            registeredCompetitions: competitions,
            accomodation
        }
        return temp
    }


    plugin.controllers.user.findUser = async (ctx) => {
        const { tathvaId, email } = ctx.query;

        try {
            let userObj;
            if (tathvaId) {
                userObj = await strapi.entityService.findMany('plugin::users-permissions.user', {
                    filters: {
                        tathvaId
                    }
                });
            }
            if (email) {
                userObj = await strapi.entityService.findMany('plugin::users-permissions.user', {
                    filters: {
                        email
                    }
                });
            }
            const filteredObj = {
                name: userObj[0].name,
                college: userObj[0].college,
                email: userObj[0].email,
                id: userObj[0].id,
            };
            return filteredObj

        } catch (error) {
            console.log(error)
        }
    }

    plugin.routes['content-api'].routes.push({
        method: 'GET',
        path: '/user/getme',
        handler: 'user.newMethod',

    },
        {
            method: 'GET',
            path: '/user/findUser',
            handler: 'user.findUser',

        }
    );
    return plugin;
}

