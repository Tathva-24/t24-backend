'use strict';

const { sanitize } = require('@strapi/utils');

module.exports = {
  async registerForWorkshop(ctx) {
    // Sanitize input to ensure data integrity
    // const sanitizedData = await sanitize.contentAPI.input(ctx.request.body);
    // console.log(sanitizedData);
    const { userId, preworkshopId } = ctx.request.body;

    // Find the user in the TathvaUser collection and the pre-workshop
    const user = await strapi.query('api::tathva-user.tathva-user').findOne({ where: { id: userId } });
    const preWorkshop = await strapi.query('api::pre-workshop.pre-workshop').findOne({ where: { id: preworkshopId } });

    if (!user || !preWorkshop) {
      return ctx.badRequest('User or Workshop not found');
    }

    // // Check if the user is already registered for the pre-workshop
    // const isAlreadyRegistered = preWorkshop.participants?.some(participant => participant.id === userId);
    // if (isAlreadyRegistered) {
    //   return ctx.badRequest('User is already registered for this workshop.');
    // }

    // // Logic to register the user for the pre-workshop
    // try {
    //   await strapi.entityService.update('api::pre-workshop.pre-workshop', preworkshopId, {
    //     data: {
    //       participants: [...(preWorkshop.participants || []), userId], // Add the user to participants list
    //     },
    //   });
    // } catch (error) {
    //   return ctx.internalServerError('Failed to register user for the workshop');
    // }

    // After successful registration, send the confirmation email
    try {
      await strapi.plugins['email'].services.email.send({
        to: 'sreeharisanjeev2004@gmail.com', // Use 'Email' field from TathvaUser schema
        from: 'lishinvs6541@gmail.com', // Default sender address
        subject: `Workshop Registration Confirmation: ${preWorkshop.Name}`,
        text: `Hello ${user.Name},\n\nYou have successfully registered for the workshop: ${preWorkshop.Name}.\nDate: ${preWorkshop.EventDate}.\n\nThank you for registering!`,
      });

      return ctx.send({ message: 'Registration successful and confirmation email sent!' });
    } catch (error) {
      console.error('Email sending failed: ', error);
      return ctx.internalServerError('Could not send confirmation email');
    }
  },
};
