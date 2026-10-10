# Signup endpoint contract

The static GitHub Pages frontend sends one JSON POST to the configured HTTPS
endpoint. There is no backend running on GitHub Pages.

```json
{
  "email": "visitor@example.com",
  "consent": true,
  "consentText": "Email me about CITY PLANNERS preorders and these designs.",
  "consentAt": "2026-10-05T04:00:00.000Z",
  "source": "shop.cityplanners.co",
  "interests": [
    {
      "design": "I4 EYESORE",
      "slug": "majesty-building",
      "color": "Black",
      "colorId": "black",
      "size": "L",
      "quantity": 1
    }
  ]
}
```

Return a 2xx status only after accepting a subscription. Return a non-2xx status
on validation or delivery failure. The frontend keeps the bag intact on either
outcome. The request has a 12-second timeout. An empty `interests` array means
general preorder updates.

The server/provider must:

- Validate email, consent, design/color/size combinations, quantity and request size.
- Deduplicate subscribers, retain consent, and support unsubscribe.
- Allow the shop origin through CORS and rate-limit abusive requests.
- Store the signup durably and notify the verified owner inbox with its selections.
- Keep provider credentials and owner delivery settings on the server.

The owner inbox is intentionally unspecified. A public Vite environment variable
must never contain email-service credentials. No owner notification has been sent
as part of generating or testing this prototype.
