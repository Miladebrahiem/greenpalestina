import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <div className="bg-white text-primary rounded-lg shadow-md p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-merriweather font-bold mb-6 text-center">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-merriweather font-semibold mb-4">Get in Touch</h2>
          <p className="mb-6 font-raleway">We'd love to hear from you. Please fill out the form below or reach out to us directly.</p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="mr-2 text-secondary" />
              <span className="font-raleway">info@vriendenvanpalestina.nl</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 text-secondary" />
              <span className="font-raleway">+31 123 456 789</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 text-secondary" />
              <span className="font-raleway">Amsterdam, The Netherlands</span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-raleway">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-raleway">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 font-raleway">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            ></textarea>
          </div>
          <button type="submit" className="btn inline-flex items-center">
            Send Message <Send className="ml-2 h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;