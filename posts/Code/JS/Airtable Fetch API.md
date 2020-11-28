```javascript
export const Air = {
  apiKey: "",
  base: "",
  url: "https://api.airtable.com/v0/",
  init: function ({ apiKey, base }) {
    this.apiKey = apiKey;
    this.base = base;
  },
  fetch: async function (table) {
    if (this.apiKey && this.base && table) {
      const endpoint = `${this.url}${this.base}/${table}?api_key=${this.apiKey}`;
      //console.log(endpoint);
      const res = await fetch(endpoint, {});
      const rj = await res.json();
      //console.log("response", rj);
      return rj;
    } else return null;
  }
};
Air.init({ apiKey, base });
Air.fetch("Link")

```

#api-code 