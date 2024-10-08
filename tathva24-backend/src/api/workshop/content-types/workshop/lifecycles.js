module.exports = {
  async afterCreate(event) {
    const { result, params } = event;
    
    await strapi.plugins['email'].services.email.send({
      to: 'rehantadpatri2005@gmail.com',
      from: 'tathva@testing.tathva.org',
      subject: `New Workshop Created: ${result.name}`,
      text: `A new workshop has been created with the title: ${result.name}`,
      html: `<p>A new workshop has been created with the title: <strong>${result.name}</strong></p>`,
    });

  },
};

