import type { Struct, Schema } from '@strapi/strapi';

export interface TeamTeam extends Struct.ComponentSchema {
  collectionName: 'components_team_teams';
  info: {
    displayName: 'committeeMember';
    icon: 'arrow-circle-up';
    description: '';
  };
  attributes: {
    name: Schema.Attribute.String;
    image: Schema.Attribute.String;
    website: Schema.Attribute.String;
  };
}

export interface UserThird extends Struct.ComponentSchema {
  collectionName: 'components_user_thirds';
  info: {
    displayName: 'Third';
  };
  attributes: {
    user: Schema.Attribute.Relation<'oneToOne', 'admin::user'>;
  };
}

export interface UserSpeakerAbout extends Struct.ComponentSchema {
  collectionName: 'components_user_speaker_abouts';
  info: {
    displayName: 'SpeakerAbout';
  };
  attributes: {
    SpeakerInfo: Schema.Attribute.String;
  };
}

export interface UserSecond extends Struct.ComponentSchema {
  collectionName: 'components_user_seconds';
  info: {
    displayName: 'Second';
  };
  attributes: {
    user: Schema.Attribute.Relation<'oneToOne', 'admin::user'>;
  };
}

export interface UserFirst extends Struct.ComponentSchema {
  collectionName: 'components_user_firsts';
  info: {
    displayName: 'First';
    icon: 'address-book';
  };
  attributes: {
    user: Schema.Attribute.Relation<'oneToOne', 'admin::user'>;
  };
}

export interface UserContacts extends Struct.ComponentSchema {
  collectionName: 'components_user_contacts';
  info: {
    displayName: 'Contacts';
  };
  attributes: {
    Name: Schema.Attribute.String;
    PhoneNo: Schema.Attribute.String;
  };
}

export interface SponsorsSponsors extends Struct.ComponentSchema {
  collectionName: 'components_sponsors_sponsors';
  info: {
    displayName: 'sponsors';
    icon: 'anchor';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String;
    link: Schema.Attribute.String;
    logo: Schema.Attribute.String;
  };
}

export interface SpeakerAboutSpeakerAbout extends Struct.ComponentSchema {
  collectionName: 'components_speaker_about_speaker_abouts';
  info: {
    displayName: 'speakerAbout';
  };
  attributes: {
    speakerInfo: Schema.Attribute.String;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    displayName: 'Slider';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    name: 'Seo';
    icon: 'allergies';
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich text';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    title: Schema.Attribute.String;
    body: Schema.Attribute.Text;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface ResultResult extends Struct.ComponentSchema {
  collectionName: 'components_result_results';
  info: {
    displayName: 'Result';
    icon: 'american-sign-language-interpreting';
  };
  attributes: {
    name: Schema.Attribute.String;
    college: Schema.Attribute.String;
  };
}

export interface EventsGuidlines extends Struct.ComponentSchema {
  collectionName: 'components_events_guidlines';
  info: {
    displayName: 'Guidlines';
    icon: 'arrow-circle-up';
  };
  attributes: {
    info: Schema.Attribute.String;
  };
}

export interface EventsEvents extends Struct.ComponentSchema {
  collectionName: 'components_events_events';
  info: {
    displayName: 'questionInfo';
    icon: 'anchor';
    description: '';
  };
  attributes: {
    question: Schema.Attribute.String;
    submissionType: Schema.Attribute.Enumeration<['textInput', 'fileInput']>;
    maxFileCount: Schema.Attribute.Integer;
    maxFileSize: Schema.Attribute.Integer;
  };
}

export interface ContactsContacts extends Struct.ComponentSchema {
  collectionName: 'components_contacts_contacts';
  info: {
    displayName: 'contacts';
    icon: 'address-book';
  };
  attributes: {
    name: Schema.Attribute.String;
    phoneNo: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'team.team': TeamTeam;
      'user.third': UserThird;
      'user.speaker-about': UserSpeakerAbout;
      'user.second': UserSecond;
      'user.first': UserFirst;
      'user.contacts': UserContacts;
      'sponsors.sponsors': SponsorsSponsors;
      'speaker-about.speaker-about': SpeakerAboutSpeakerAbout;
      'shared.slider': SharedSlider;
      'shared.seo': SharedSeo;
      'shared.rich-text': SharedRichText;
      'shared.quote': SharedQuote;
      'shared.media': SharedMedia;
      'result.result': ResultResult;
      'events.guidlines': EventsGuidlines;
      'events.events': EventsEvents;
      'contacts.contacts': ContactsContacts;
    }
  }
}
