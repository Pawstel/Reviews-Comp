To build:
clone file
npm install
npm run build
npm start
To see client:
Navigate to: http://localhost:3002

Crud Methods:
Get Requests: Get Overview information:

curl -X GET 'http://localhost:3002/reviews_service/listing/overview/pawstel/:listingid'

Get Review Info:

curl -X GET 'http://localhost:3002/reviews_service/listing/reviews/pawstel/:listingid''

Update user review:

curl -X PUT 'http://localhost:3002/reviews_service/listing/update/pawstel/:id/:review'

Delete user review:

curl -X DELETE 'http://localhost:3002/reviews_service/listing/delete/pawstel/:id/:review

Create review: curl -X POST -h 'Content-Type: application/json' -d '{"first_name":, "listing_id":, "user_id": , "accuracy":, "communication": , "cleanliness":, "location":, "check_in":, "value":, "date":, "content":}'

Note: Date for user join date: yyyy-mm-dd
