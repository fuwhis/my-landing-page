export type ContactForm = {
  name: string;
  email: string;
  message: string;
  time: string;
};

export type ContactFormFields = Pick<ContactForm, 'name' | 'email' | 'message'>;

export type ContactFormTemplateParams = ContactForm;
