var app=angular.module('myApp',[]);

app.controller('myCtrl', function ($http, $scope,$window) {
    $http.get("../data/ti.json").success(function (data) {
        $scope.ti = data.root;
        $scope.idx = 0;
    });
    var jieguo;
    $http.get("../data/jieguo.json").success(function(data){
         jieguo=data.root;
    });
    var count = [];
    var now = 1;
    $scope.a = "btn btn-default";
    $scope.b = "btn btn-default";
    $scope.upflg = true;
    $scope.downflg = true;
    $scope.rere = '<<上一题';
    $scope.gogo = '下一题>>';

    $scope.shi = function () {
        $scope.a = "btn btn-clicked";
        $scope.b = "btn btn-default";
        now = 1;
        $scope.isOpen();
    }
    $scope.fou = function () {
        $scope.a = "btn btn-default";
        $scope.b = "btn btn-clicked";
        now = 0;
        $scope.isOpen();
    }
    //上一题
    $scope.up = function () {
        if ($scope.idx < count.length) {
            count[$scope.idx] = now;
        }
        var histy = count[$scope.idx - 1];
        if (histy == 0) {
            $scope.a = "btn btn-default";
            $scope.b = "btn btn-clicked";
        } else {
            $scope.a = "btn btn-clicked";
            $scope.b = "btn btn-default";
        }
        now = histy;
        $scope.idx -= 1;
        $scope.isOpen();
        console.log(count);
    }
    //下一题
    $scope.down = function () {
        if ($scope.gogo == '查看结果>>') {
            count.push(now);
            $scope.toResult();
        } else {
            if ($scope.idx < (count.length)) {
                //$scope.idx[count.length-1]=now;
                count[$scope.idx] = now;
                var histy = count[$scope.idx];
                if (count.length == $scope.idx + 1) {
                    now = 1;
                } else {
                    now = count[$scope.idx + 1]
                }
            } else {
                count.push(now);
                now = 1;
            }
            if (now == 0) {
                $scope.a = "btn btn-default";
                $scope.b = "btn btn-clicked";
            } else {
                $scope.a = "btn btn-clicked";
                $scope.b = "btn btn-default";
            }
            $scope.idx += 1;
            $scope.isOpen();
            console.log(count);
        }
    }

    //控制按钮状态
    $scope.isOpen = function () {
        if ($scope.idx <= 0) {
            $scope.upflg = true;
            $scope.downflg = false;
        } else if ($scope.idx >= 19) {
            $scope.upflg = false
            $scope.gogo = '查看结果>>';
        } else {
            $scope.upflg = false;
            $scope.downflg = false;
            $scope.gogo = '下一题>>';
        }
    }

    //计算测试结果
    $scope.toResult = function () {
        var a=0;
        var b=0;
        for(var i in count){
            if(i<10){
                a+=count[i];
            }else{
                b+=count[i];
            }
        }
        if(a>b){
            window.localStorage['result']=angular.toJson(jieguo[0]);
        }else if(b>a){
            window.localStorage['result']=angular.toJson(jieguo[1]);
        }else if(a==b){
            window.localStorage['result']=angular.toJson(jieguo[2]);
        }
    $window.location.href="../www/result.html";
    }
});
