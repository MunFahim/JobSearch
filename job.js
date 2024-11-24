import notificationapi from 'notificationapi-node-server-sdk'


notificationapi.init(
  'jmfe4uh40520wma7oyuo1cjotq', // clientId
  '5rp5r4kglrkg1h7xpygh8vcuwyg8nxf0exy2jy828tnaim0qmxws3d5e1x'// clientSecret
)


//const elk = ["39.207073","-76.72717"];
//"39.207073","-76.72717"
const hag = ["48.0093","-122.1835"];
const mi = "30";


const theDate = () =>{
    const timestamp = Date.now(); // Get the current timestamp in milliseconds

    const date = new Date(timestamp);

    const day = date.getDate();

    const month = date.getMonth() + 1;

    const year = date.getFullYear();

    return year.toString()+"-"+month.toString()+"-"+day.toString();
}


fetch("https://e5mquma77feepi2bdn4d6h3mpu.appsync-api.us-east-1.amazonaws.com/graphql", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "authorization": "Bearer Status|unauthenticated|Session|eyJhbGciOiJLTVMiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE3MzI0NjYzNDAsImV4cCI6MTczMjQ2OTk0MH0.AQICAHgz1m58+e586dZFf4bchvbbMWCAcCXZvg9CS5F50i9DfAF9G7I2OtwVtwpbP5l842LCAAAAtDCBsQYJKoZIhvcNAQcGoIGjMIGgAgEAMIGaBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDPkRslTwGDrPErCu1gIBEIBtsA84cfr1yX/eg2Fhfw+nY/Zm5M5zhghMKLalNPp4PdIpK+jJsw+cf31lgIL2Q8TMcsC3IkxRr6HBiUfMUPQwBwnhhTsgIcX2xUb+YW/8scgHQJ/0E7Gj3U2zzS4s/cX0h9C7b0KE53umNQwr8g==",
      "content-type": "application/json",
      "country": "United States",
      "iscanary": "false",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": "\"Android\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "Referer": "https://hiring.amazon.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": `{\"operationName\":\"searchJobCardsByLocation\",\"variables\":{\"searchJobRequest\":{\"locale\":\"en-US\",\"country\":\"United States\",\"keyWords\":\"\",\"equalFilters\":[],\"containFilters\":[{\"key\":\"isPrivateSchedule\",\"val\":[\"false\"]},{\"key\":\"jobTitle\",\"val\":[\"Amazon Fulfillment Center Warehouse Associate\"]}],\"rangeFilters\":[{\"key\":\"hoursPerWeek\",\"range\":{\"minimum\":0,\"maximum\":80}}],\"orFilters\":[],\"dateFilters\":[{\"key\":\"firstDayOnSite\",\"range\":{\"startDate\":\"${theDate()}\"}}],\"sorters\":[],\"pageSize\":100,\"geoQueryClause\":{\"lat\":${hag[0]},\"lng\":${hag[1]},\"unit\":\"mi\",\"distance\":${mi}},\"consolidateSchedule\":true}},\"query\":\"query searchJobCardsByLocation($searchJobRequest: SearchJobRequest!) {\\n  searchJobCardsByLocation(searchJobRequest: $searchJobRequest) {\\n    nextToken\\n    jobCards {\\n      jobId\\n      language\\n      dataSource\\n      requisitionType\\n      jobTitle\\n      jobType\\n      employmentType\\n      city\\n      state\\n      postalCode\\n      locationName\\n      totalPayRateMin\\n      totalPayRateMax\\n      tagLine\\n      bannerText\\n      image\\n      jobPreviewVideo\\n      distance\\n      featuredJob\\n      bonusJob\\n      bonusPay\\n      scheduleCount\\n      currencyCode\\n      geoClusterDescription\\n      surgePay\\n      jobTypeL10N\\n      employmentTypeL10N\\n      bonusPayL10N\\n      surgePayL10N\\n      totalPayRateMinL10N\\n      totalPayRateMaxL10N\\n      distanceL10N\\n      monthlyBasePayMin\\n      monthlyBasePayMinL10N\\n      monthlyBasePayMax\\n      monthlyBasePayMaxL10N\\n      jobContainerJobMetaL1\\n      virtualLocation\\n      poolingEnabled\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
    "method": "POST"
  }).then(res=>res.json()).then(resData=>{
    const arrOfJobs = resData.data.searchJobCardsByLocation.jobCards;
    //console.log(`Current Number of Jobs: ${arrOfJobs.length}`);
    //console.log("Flex-Time jobs avaliable: ");

    let found = false;
    let fLen = 0;
    let jobsStr = "";
    arrOfJobs.forEach(job=>{
        if (job.jobType == "FLEX_TIME"){
            found = true;
            jobsStr += `https://hiring.amazon.com/app#/jobDetail?jobId=${job.jobId} \n`;
            fLen += 1;
        }
    })
    
    const str = `${fLen} Job(s) have been found: \n ${jobsStr}`;

    if (found){
        notificationapi.send({
            notificationId: 'amazon_flex_time_job_found',
            user: {
                id: "maheenashraf07@gmail.com",
                email: "maheenashraf07@gmail.com",
            },
            mergeTags: {
                "comment": str,
            }
        })
    }

  });

