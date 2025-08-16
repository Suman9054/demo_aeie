import React, { useState } from "react";

export default function ContactUs(): React.JSX.Element {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      // Replace with your actual API endpoint or form handling logic
      /*
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit form");
      */

      // Simulate submit delay
      await new Promise((res) => setTimeout(res, 1500));
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-900 to-blue-950 px-4 py-12">
      <section className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg p-8 sm:p-12 text-white">
        <h1 className="text-4xl font-extrabold mb-6 text-center">Contact Us</h1>
        <p className="text-center text-blue-200 mb-10 max-w-lg mx-auto">
          Have questions? We'd love to hear from you! Please fill out the form and we'll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full rounded-md border border-blue-500 bg-transparent py-3 px-4 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full rounded-md border border-blue-500 bg-transparent py-3 px-4 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-2 font-semibold">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="Briefly describe your inquiry"
              className="w-full rounded-md border border-blue-500 bg-transparent py-3 px-4 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-semibold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full rounded-md border border-blue-500 bg-transparent py-3 px-4 text-white placeholder-blue-300 resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={formStatus === "submitting"}
            className={`w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors duration-300 font-semibold ${
              formStatus === "submitting" ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {formStatus === "submitting" ? "Sending..." : "Send Message"}
          </button>

          {formStatus === "success" && (
            <p className="mt-4 text-green-400 font-medium text-center">
              Your message has been sent successfully!
            </p>
          )}
          {formStatus === "error" && (
            <p className="mt-4 text-red-400 font-medium text-center">
              Something went wrong. Please try again later.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
