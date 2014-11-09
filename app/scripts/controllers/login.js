// Generated by CoffeeScript 1.7.1
"use strict";
Mifan.controller("loginCtrl", function($scope, $http, $timeout, $location) {
  var API, SNS, userLogin, userLoginErrorCb, userLoginSuccessCb;
  API = $scope.API;
  $scope.$on("$viewContentLoaded", function() {
    return $scope.$emit("pageChange", "login");
  });
  $scope.error = null;
  userLoginSuccessCb = function(data, status) {

    /*
    {
      "msg": "密码错误！",
      "ret": "104003"
    }
    
    {
      "msg": "Email不存在，你可能还没有注册！",
      "ret": "104002"
    }
    
    {
      "msg": "OK",
      "ret": "100000",
      "result": {}
    }
     */
    var result, ret;
    ret = data["ret"];
    if (ret === "100000") {
      result = data["result"];
      $scope.$emit("onLogined", result);
    } else if (ret === "104003") {
      $scope.error = {
        type: "password",
        msg: "密码错误 :("
      };
    } else if (ret === "104002") {
      $scope.error = {
        type: "username",
        msg: "用户名不存在 T_T"
      };
    }
    if ($scope.error) {
      $timeout(function() {
        return $scope.error = null;
      }, 3000);
    }
    return $scope.isLoging = false;
  };
  userLoginErrorCb = function(data, status) {
    var ret;
    ret = data["ret"];
    return $scope.isLoging = false;
  };
  userLogin = function() {
    $scope.isLoging = true;
    return $http({
      method: IsDebug ? "GET" : "POST",
      url: API.user,
      data: {
        user_email: $scope.email,
        user_password: $scope.password
      }
    }).success(userLoginSuccessCb).error(userLoginErrorCb);
  };
  $scope.$watch("email + password", function() {
    return $scope.isLogValid = $scope.email && $scope.password;
  });
  $scope.isLoging = false;
  $scope.onSubmit = function() {
    if ($scope.email && $scope.password) {
      return userLogin();
    }
  };
  SNS = {
    init: function() {
      $scope.loginweibo = SNS.weibo;
      if (SNS.getWeiboLoginCode()) {
        return SNS.weiboLoginSuccess();
      }
    },
    weibo: function() {
      var api;
      if ($scope.isWeiboLoging) {
        return false;
      }
      $scope.isWeiboLoging = true;
      api = "" + API.weiboLogin;
      if (IsDebug) {
        api = API.weiboLogin;
      }
      return $http.get(api).success(SNS.weiboCb);
    },
    weiboCb: function(data) {
      var msg, result, ret;
      $scope.isWeiboLoging = false;
      ret = data.ret, msg = data.msg, result = data.result;
      return LOC["href"] = result;
    },
    getWeiboLoginCode: function() {
      var code, _ref;
      code = (_ref = $location.$$search) != null ? _ref["code"] : void 0;
      SNS.weiboLoginCode = code;
      return code;
    },
    weiboLoginSuccess: function() {
      var api;
      api = IsDebug ? API.weiboLoginCb : "" + API.weiboLoginCb + "?code=" + SNS.weiboLoginCode;
      $http.get(api).success(SNS.weiboLoginSuccessCb);
      return $scope.isWeiboLoging = true;
    },
    weiboLoginSuccessCb: function(data) {
      var msg, result, ret;
      ret = data.ret, msg = data.msg, result = data.result;
      $scope.isWeiboLoging = false;
      $location.$$search = null;
      if (result) {
        return $scope.$emit("onLogined", result);
      } else {
        return $scope.toast(msg, "warn");
      }
    }
  };
  return SNS.init();
});
