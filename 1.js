let event = {
  "_id": {
    "$oid": "5a1e39c53b04091b501cbd6a"
  },
  "uid": "codegirls17",
  "name": "Codegirls Secret Santa 2017",
  "startDate": {
    "$date": "2017-11-26T19:00:00.000Z"
  },
  "endDate": {
    "$date": "2017-12-08T19:00:00.000Z"
  },
  "members": [
    {
      "$oid": "5a1e39d4863474001460c9c1"
    },
    {
      "$oid": "5a1e4897492d2700148f0392"
    },
    {
      "$oid": "5a1e976a45740e00142606df"
    },
    {
      "$oid": "5a1e983045740e00142606e0"
    },
    {
      "$oid": "5a1e983345740e00142606e1"
    },
    {
      "$oid": "5a2277ed9929460014ea100c"
    },
    {
      "$oid": "5a2277f89929460014ea100d"
    },
    {
      "$oid": "5a227dc39929460014ea100e"
    },
    {
      "$oid": "5a2437b3c9c96b00144aa893"
    },
    {
      "$oid": "5a264d2bdc7837001446770b"
    },
    {
      "$oid": "5a265301dc7837001446770c"
    },
    {
      "$oid": "5a265a4ddc7837001446770d"
    },
    {
      "$oid": "5a266271dc7837001446770e"
    },
    {
      "$oid": "5a2a04f38436260014c8e595"
    }
  ],
  "pairs": [
    {
      "from": {
        "$oid": "5a1e39d4863474001460c9c1"
      },
      "to": {
        "$oid": "5a265a4ddc7837001446770d"
      },
      "_id": {
        "$oid": "5a2b893e999b490014e08dd6"
      },
      "isGiftReceived": false,
      "isGiftSent": false
    },
    {
      "from": {
        "$oid": "5a1e4897492d2700148f0392"
      },
      "to": {
        "$oid": "5a1e39d4863474001460c9c1"
      },
      "_id": {
        "$oid": "5a2b893e999b490014e08dd5"
      },
      "isGiftReceived": false,
      "isGiftSent": false
    },
    {
      "from": {
        "$oid": "5a1e983045740e00142606e0"
      },
      "to": {
        "$oid": "5a2277ed9929460014ea100c"
      },
      "_id": {
        "$oid": "5a2b893e999b490014e08dd4"
      },
      "isGiftReceived": false,
      "isGiftSent": false
    },
    {
      "from": {
        "$oid": "5a2277ed9929460014ea100c"
      },
      "to": {
        "$oid": "5a1e983045740e00142606e0"
      },
      "_id": {
        "$oid": "5a2b893e999b490014e08dd3"
      },
      "isGiftReceived": false,
      "isGiftSent": false
    },
    {
      "from": {
        "$oid": "5a2277f89929460014ea100d"
      },
      "to": {
        "$oid": "5a266271dc7837001446770e"
      },
      "_id": {
        "$oid": "5a2b893e999b490014e08dd2"
      },
      "isGiftReceived": false,
      "isGiftSent": false
    },
    {
      "from": {
        "$oid": "5a227dc39929460014ea100e"
      },
      "to": {
        "$oid": "5a2437b3c9c96b00144aa893"
      },
      "_id": {
        "$oid": "5a2b893e999b490014e08dd1"
      },
      "isGiftReceived": false,
      "isGiftSent": false
    },
    {
      "from": {
        "$oid": "5a2437b3c9c96b00144aa893"
      },
      "to": {
        "$oid": "5a1e4897492d2700148f0392"
      },
      "_id": {
        "$oid": "5a2b893e999b490014e08dd0"
      },
      "isGiftReceived": false,
      "isGiftSent": false
    },
    {
      "from": {
        "$oid": "5a265a4ddc7837001446770d"
      },
      "to": {
        "$oid": "5a227dc39929460014ea100e"
      },
      "_id": {
        "$oid": "5a2b893e999b490014e08dcf"
      },
      "isGiftReceived": false,
      "isGiftSent": false
    },
    {
      "from": {
        "$oid": "5a266271dc7837001446770e"
      },
      "to": {
        "$oid": "5a2277f89929460014ea100d"
      },
      "_id": {
        "$oid": "5a2b893e999b490014e08dce"
      },
      "isGiftReceived": false,
      "isGiftSent": false
    }
  ],
  "__v": 15
};

console.log(event.members.length);
console.log(event.pairs.length);
console.log(event.members.filter(member => member.postData.fullName === '' || member.postData.address === '').length);
console.log(event.pairs.filter(member => member.from === member.to));

console.log(event.pairs.filter(member => member.from === member.to));