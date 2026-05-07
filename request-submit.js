const DEFAULT_FORM_ENDPOINT = "https://formspree.io/f/mzdoazrg";

function attachRequestForms() {
  document.querySelectorAll("[data-request-form]").forEach((form) => {
    if (form.dataset.bound === "true") return;
    form.dataset.bound = "true";
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = getSiteData();
      const formData = new FormData(form);
      const createdAt = new Date().toISOString();
      const payload = {
        formType: form.dataset.formType || "Website request",
        submittedAt: createdAt,
        sourcePage: window.location.href,
        recipient: data.contact?.recipientEmail || "sales@seeingflow.com"
      };
      formData.forEach((value, key) => {
        payload[key] = String(value).trim();
      });
      if (!payload.email) {
        alert("Please enter an email address.");
        return;
      }

      const requests = JSON.parse(localStorage.getItem("websiteRequests") || "[]");
      requests.push(payload);
      localStorage.setItem("websiteRequests", JSON.stringify(requests));

      const subscribers = JSON.parse(localStorage.getItem("newsletterSubscribers") || "[]");
      subscribers.push({ email: payload.email, createdAt, formType: payload.formType });
      localStorage.setItem("newsletterSubscribers", JSON.stringify(subscribers));

      const endpoint = data.contact?.formEndpoint || DEFAULT_FORM_ENDPOINT;
      if (endpoint) {
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: (() => {
              const outgoing = new FormData();
              Object.entries(payload).forEach(([key, value]) => outgoing.append(key, value));
              outgoing.append("_subject", `New website request: ${payload.formType}`);
              return outgoing;
            })()
          });
          if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
          form.reset();
          alert("Thank you. Your request has been sent to our sales team.");
          return;
        } catch (error) {
          console.error(error);
          alert("The automatic email service could not be reached. Please try again later.");
          return;
        }
      }
    });
  });
}

attachRequestForms();
