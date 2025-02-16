https://vnrebates.io/
API
1 https://api.vnrebates.io/api/v1/broker
{
"createdBy": null,
"createdDate": null,
"lastModifiedBy": "Nguyễn Danh Nhân",
"lastModifiedDate": "2022-08-01T06:50:01.915Z",
"id": 1,
"name": "FXTM",
"code": "FXTM",
"image": "https://vnrebates.net/static/FXTMlogo-3ad3cc7e02b832a3df6a8767b74fe015.png",
"rateRebateGold": 20, // confuse
"rateRebateGoldType": "MONEY", // confuse
"rateRebateCurrency": 10,
"rateRebateCurrencyType": "MONEY",
"rateRebateUserGold": 5,
"rateRebateUserGoldType": "MONEY",
"rateRebateUserCurrency": 2,
"rateRebateUserCurrencyType": "MONEY",
"active": true, //use status for good management, ez to mgm approve flow
"isShowPostDetail": null
}

2 https://api.vnrebates.io/api/v1/httpStatuses/haravanProduct
pagination page

3 Mini Bug
Login by google account => profile => change email (exam@gmail.com) => logout => login again with first email => profile => current email,
Expect: The email is exam@gmail.com

========
split some logic for FE code
pagination page
clean json
good perform

++++++++++++++++++++++++++++
https://beecryptos.com/
API

1 https://api.beecryptos.com/api/v1/wp-posts/getPostGroupHomepage
{
"id": 312,
"postUrl": "chuongtrinhairdrop",
"postTitle": "CHƯƠNG TRÌNH AIRDROP: ĐÓN NĂM MỚI CÙNG BEE CRYPTOS",
"postExcerpt": "Xuân về rồi anh em ơi! Tết này ở nhà ấm cúng, cảm nhận cái lạnh đầu năm",
"postCategory": "[1,4,8]",
"postDate": "2025-01-17T04:18:27.000+0000",
"postModified": "2025-01-17T08:44:40.000+0000",
"publicDate": "2025-01-17T08:19:36.000+0000",
"postThumbnail": "https://s3-ap-southeast-1.amazonaws.com/agileops-gafv-dev-videos/beeThumbnail/1737087209563-hehe.png",
"postPath": "kien-thuc-crypto/chuongtrinhairdrop.html",
"author": {
"id": 454,
"name": "Hyo",
"slug": null,
"image": "https://s3-ap-southeast-1.amazonaws.com/agileops-gafv-dev-videos/beeProfilePicture/1724131471984-001f77811078b426ed69.jpg",
"authorListHighlights": null,
"authorUrlFb": null,
"authorUrlTwitter": null,
"authorUrlLinkedin": null,
"authorUrlWeb": null,
"authorProfession": null,
"email": null
},//if multiple author ??
"tokenCode": null
}

=======
split some logic for FE code
clean json
good perform
