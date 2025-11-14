'use client';

import { useEffect, useState } from "react";


export default function Contact() {
  const [contactPage, setContactPage] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    fetch(
      `https://rebar-xbackend.vercel.app/api/globals/contact-page?depth=2`
    )
      .then((res) => res.json())
      .then((data) => setContactPage(data));
  }, []);

  console.log(contactPage, 'the contactpage')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://rebar-xbackend.vercel.app/api/contact-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: formValues,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitted(true);
      setFormValues({});
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  if (!contactPage) return;
  
  const last = contactPage?.formFields?.at(-1);

  console.log(last, 'this is lat')

    return (
      <section className="section hero-contact-a">
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="w-layout-grid contact-a-halves">
            <div className="contact-a-left">
              <div className="headline-contact-a">
                <div className="label">{contactPage.smallTitle}</div>
                <div className="heading-contact-a">
                  <div className="text-h1"> {contactPage.heading} </div>
                </div>
                <div className="text-body">{contactPage.description}</div>
              </div>
              <div className="w-layout-grid contact-a-address-block">
                <div className="contact-a-address-tile">
                  <div className="text-body semibold">Address</div>
                  <div className="text-body">{contactPage.address}</div>
                </div>
                <div className="contact-a-address-tile">
                  <div className="text-body semibold">Email</div>
                  <div className="text-body"> {contactPage.email} </div>
                </div>
              </div>
              {/* <div className="w-form">
                <form
                  id="wf-form-Email-Form"
                  name="wf-form-Email-Form"
                  data-name="Email Form"
                  method="post"
                  className="contact-form"
                  data-wf-page-id="67337f627413b847e2064d66"
                  data-wf-element-id="ba2d1bf6-b4f1-904b-4100-318d9149ae98"
                >
                  <div className="w-layout-grid input-halves">
                    {contactPage.formFields.slice(0, -1).map((fr, index) => (
                      <div className="contact-input-wrap">
                        <div className="label">{fr.label}</div>
                        <input
                          className="text-field w-input"
                          name={fr.name}
                          data-name="Name"
                          placeholder="Name"
                          type={fr.type}
                          id="name"
                          required
                        />
                      </div>
                    ))}
                    
                  </div>
                  <div className="contact-input-wrap">
                    <div className="label">{last.label}</div>
                    <textarea
                      placeholder="Message"
                      id="Message"
                      name={last.name}
                      data-name="Message"
                      className="text-field text-area w-input"
                      required
                    ></textarea>
                  </div>
                  <input
                    type="submit"
                    data-wait="Please wait..."
                    className="cta-main small w-button"
                    value="Send message"
                  />
                </form>
                <div className="success-message w-form-done">
                  <div>Thank you! Your submission has been received!</div>
                </div>
                <div className="error-message w-form-fail">
                  <div>
                    Oops! Something went wrong while submitting the form.
                  </div>
                </div>
              </div> */}

              <div className="w-form">
                {submitted && (
                  <div className="success-message w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="w-layout-grid input-halves">
                    {contactPage.formFields.slice(0, -1).map((fr, index) => (
                      <div className="contact-input-wrap" key={index}>
                        <div className="label">{fr.label}</div>
                        <input
                          className="text-field w-input"
                          name={fr.name}
                          placeholder={fr.label}
                          type={fr.type}
                          required
                          value={formValues[fr.name] || ""}
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                  </div>

                  {last && (
                    <div className="contact-input-wrap">
                      <div className="label">{last.label}</div>
                      <textarea
                        placeholder={last.label}
                        name={last.name}
                        className="text-field text-area w-input"
                        required
                        value={formValues[last.name] || ""}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  <input
                    type="submit"
                    className="cta-main small w-button"
                    value="Send message"
                  />
                </form>

                {error && (
                  <div className="error-message w-form-fail">
                    <div>
                      Oops! Something went wrong while submitting the form.
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              id="w-node-_7f54b512-2237-d830-8642-e97738a56880-e2064d66"
              className="contact-a-right"
            >
              <img
                src={contactPage.image.cloudinaryUrl}
                loading="lazy"
                sizes="(max-width: 479px) 100vw, (max-width: 767px) 92vw, (max-width: 991px) 94vw, 557px"
                alt=""
                className="image-cover"
              />
            </div>
          </div>
        </div>
      </section>
    );
}