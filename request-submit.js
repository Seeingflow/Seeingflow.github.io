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

      const endpoint = data.contact?.formEndpoint || "";
      if (endpoint) {
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
          form.reset();
          alert("Thank you. Your request has been sent to our sales team.");
          return;
        } catch (error) {
          console.error(error);
          alert("The automatic email service could not be reached. An email draft will open instead.");
        }
      }

      const subject = `New website request: ${payload.formType}`;
      const body = [
        "Hello SeeingFlow Sales Team,",
        "",
        "A new visitor submitted a website request.",
        "",
        ...Object.entries(payload).map(([key, value]) => `${key}: ${value}`),
        "",
        "This message was generated from the website form."
      ].join("\n");
      window.location.href = `mailto:${encodeURIComponent(payload.recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      form.reset();
    });
  });
}

attachRequestForms();
