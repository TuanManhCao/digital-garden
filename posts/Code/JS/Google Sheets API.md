```javascript
const { google } = require("googleapis")


const sheets = google.sheets({
    version: 'v4',
    auth: 'AIz***********************************Q'
});


const SheetsAPI = {
    sheetId:'**********vsN22p4wRC35cq7vDGb__Ycy-Pi_7Pto34',
    // fetch remote data
    fetchSheet: async function(){
        const params = {
            spreadsheetId: this.sheetId,
            range:"Sheet1!A2:H1000"
        };
        const res = await sheets.spreadsheets.values.get(params);
        //console.log("response", res.data.values);
        return res.data.values
    },
	transformSingleRecord: function(arr,i){
		return {
			title:arr[0],
			url:arr[1],
			bilgi:arr[2],
			description:arr[3],
			imageUrl:arr[4],
			topic:arr[5],
			tag:arr[6],
			altTag:arr[7]
		}
	},

	getSheetData: async function(){
            const rawdata = await this.fetchSheet()
            return rawdata.map(row => this.transformSingleRecord(row))
	}

}

```

#api-code
