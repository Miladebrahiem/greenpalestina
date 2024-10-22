import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    projectDetails: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      company: '',
      budget: '',
      projectDetails: '',
    });
  };

  return (
    <div className="bg-primary text-secondary p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-merriweather font-bold mb-6">Contact Us</h2>
      <p className="mb-6 font-raleway">
        Looking for a partner in supporting Palestine? You found us.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="w-full md:w-1/2 px-4 py-2 rounded-md bg-white text-primary"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your e-mail"
            required
            className="w-full md:w-1/2 px-4 py-2 rounded-md bg-white text-primary"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            className="w-full md:w-1/2 px-4 py-2 rounded-md bg-white text-primary"
          />
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Approx. budget"
            className="w-full md:w-1/2 px-4 py-2 rounded-md bg-white text-primary"
          />
        </div>
        <textarea
          name="projectDetails"
          value={formData.projectDetails}
          onChange={handleChange}
          placeholder="Write us a few words about your project and we'll prepare a proposal for you within 24 hours."
          rows={4}
          className="w-full px-4 py-2 rounded-md bg-white text-primary"
        ></textarea>
        <button
          type="submit"
          className="bg-secondary text-primary px-6 py-2 rounded-md hover:bg-opacity-90 transition duration-300 flex items-center justify-center font-raleway"
        >
          Send <Send className="ml-2" size={18} />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;