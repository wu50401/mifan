// Generated by CoffeeScript 1.7.1
Mifan.controller("homeAnswer", function($scope) {
  $scope.content = "回答我的";
  console.log("回答我的");
  $scope.$emit("clearAnswerRemind");
  return $scope.ansCollect = [
    {
      ques: {
        id: 1,
        username: "依然大头",
        face: "http://mifan.us/cache/user/0/0/48/7dfecd76fb_48_48.png",
        text: "女朋友要过生日了，买个什么礼物呢？ 具体一些哈~~大谢！"
      },
      ans: {
        id: 2,
        username: "老婆婆",
        face: "http://mifan.us/cache/user/0/0/48/6c9e391e64_48_48.jpg",
        text: "买一个上市公司送她，让她做老板。"
      },
      bblActv: false,
      bblActvShow: false
    }
  ];
});