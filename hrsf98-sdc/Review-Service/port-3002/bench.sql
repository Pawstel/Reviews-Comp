select reviews.id, users.name, users.photo, reviews._date, reviews.content from users inner join reviews on reviews.listing_id = 1000000 and reviews.user_id = users.id;