<?php
/**
 * @Author: DocTam
 * @Date:   2019-06-14 10:15:21
 * @Last Modified by:   DocTam
 * @Last Modified time: 2019-08-26 12:32:45
 */

/**
 * URL跳转
 * @param string $url 跳转地址
 * @param int $time 跳转延时(单位:秒)
 * @param string $msg 提示语
 * 参考来源：https://www.cnblogs.com/52php/p/5673348.html
 */
function redirect($url, $time = 0, $msg = '') {
    $url = str_replace(array("\n", "\r"), '', $url); // 多行URL地址支持
    if (empty($msg)) {
        $msg = "系统将在 {$time}秒 之后自动跳转到 {$url} ！";
    }
    if (headers_sent()) {
        $str = "<meta http-equiv='Refresh' content='{$time};URL={$url}'>";
        if ($time != 0) {
            $str .= $msg;
        }
        exit($str);
    } else {
        if (0 === $time) {
            header("Location: " . $url);
        } else {
            header("Content-type: text/html; charset=utf-8");
            header("refresh:{$time};url={$url}");
            echo($msg);
        }
        exit();
    }
}

/**
 * 获取客户端真实ip地址
 * @return string $ip 真实ip地址
 * 参考来源：http://www.phpernote.com/php-function/322.html
 */
function get_real_ip(){
    $ip=false;
    if(!empty($_SERVER['HTTP_CLIENT_IP'])){
        $ip=$_SERVER['HTTP_CLIENT_IP'];
    }
    if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
        $ips=explode (', ', $_SERVER['HTTP_X_FORWARDED_FOR']);
        if($ip){ array_unshift($ips, $ip); $ip=FALSE; }
        for ($i=0; $i < count($ips); $i++){
            if(!preg_match ('/^(10│172.16│192.168)./', $ips[$i])){
                $ip=$ips[$i];
                break;
            }
        }
    }
    return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
}

/**
 * 识别是电脑或手机访问
 * @return boolean 识别是否是手机访问
 * 参考来源：http://www.phpernote.com/php-function/1043.html
 */
function isMobile(){
    $useragent=isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
    $useragent_commentsblock=preg_match('|\(.*?\)|',$useragent,$matches)>0?$matches[0]:'';
    $mobile_os_list=array('Google Wireless Transcoder','Windows CE','WindowsCE','Symbian','Android','armv6l','armv5','Mobile','CentOS','mowser','AvantGo','Opera Mobi','J2ME/MIDP','Smartphone','Go.Web','Palm','iPAQ');
    $mobile_token_list=array('Profile/MIDP','Configuration/CLDC-','160×160','176×220','240×240','240×320','320×240','UP.Browser','UP.Link','SymbianOS','PalmOS','PocketPC','SonyEricsson','Nokia','BlackBerry','Vodafone','BenQ','Novarra-Vision','Iris','NetFront','HTC_','Xda_','SAMSUNG-SGH','Wapaka','DoCoMo','iPhone','iPod');
    $found_mobile=CheckSubstrs($mobile_os_list, $useragent_commentsblock)||CheckSubstrs($mobile_token_list, $useragent);
    if($found_mobile){
        return true;
    }else{
        return false;
    }
}

function CheckSubstrs($substrs, $text){
    foreach($substrs as $substr){
        if(false!==strpos($text, $substr)){
            return true;
        }
        return false;
    }
}

function errorTips($str){
    echo $str;
    exit;
}

/**
 * 获取指定页面数据
 * @param  [type] $url 被获取数据的页面链接地址
 * 参考来源：
 */
function loopGetContent($url){
    $bodyContent = "";
    $isUrl = getRedirectUrlInfo($url);
    if(!$isUrl) errorTips($url . " ==> 此链接地址无效！");
    $baseStr = '<base href="'. $isUrl["origin"] .'" />';
    $cssStr = '
    <style>
        .box .content .NurserySList{margin: auto 13.5%;border: none;}
    </style>';
    $jsStr = $_POST["printInfo"] < 1 ? "" : '<script>window.onload = function(){window.print();}</script>';
    $pageNum = substr($isUrl["url_end"], 1);
    if(!is_numeric($pageNum)) {
        $initNum = 1;
        $pageNum = getPageNum($url);
    }else{
        $initNum = $pageNum;
    }
    // $pageNum = 20;
    for($i = $initNum; $i <= $pageNum; $i++){
        $url_end = $initNum == 1 ? "/p" . $i : "";
        $bodyContent = $bodyContent . matchPageInfo($url . $url_end);
    }
    $html = preg_replace('/<ul class=\"slist\">(.*?)<\/ul.*?>/is', '<ul class="slist">' . $bodyContent . '</ul>', getDOMString($url));
    $html = preg_replace("/<\/head>/is", $baseStr . $cssStr . $jsStr . "</head>", $html);
    echo cleanHtml($html);
}

function getHtmlContent($url){
    // 有些网页加载时间比较长，可以通过动态设置执行最大时间，可选
    ini_set("max_execution_time", "45");
    // 有些网页有防盗链，可以模拟成浏览器去请求，可选
    ini_set('user_agent', 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; 4399Box.560; .NET4.0C; .NET4.0E)');
    $html = file_get_contents($url);
    /*
    // 如果乱码，请设置相应的编码
    $html = iconv("gb2312", "utf-8//IGNORE", $html);
    var_dump($html);
    */
    return $html;
}

function cleanHtml($str){
    $str = preg_replace("/\s/is", " ", $str);
    $str = preg_replace("/(\t|\r\n|\r|\n|\  )/is", "", $str);
    if($_POST["imgInfo"] < 1){
       $str = preg_replace('/<dt><a.*?class=\"pic\">(.*?)<\/a><\/dt.*?>/is', '', $str);
    }
    return trim($str);
}

function getDOMString($url){
    $html = getHtmlContent($url);
    $html = preg_replace('/<div class=\"(hd_nav|head|nav|cityBox|search|location|menufix|schoolAbout|footer|menufix)\">(.*?)<\/div.*?>/is', '', $html);
    $html = preg_replace('/<ul class=\"slist\">(.*?)<\/ul.*?>/is', '<ul class="slist"></ul>', $html);
    $html = preg_replace('/<ul class=\"UNav\">(.*?)<\/ul.*?>/is', '', $html);
    $html = preg_replace('/<dl class=\"ask\">(.*?)<\/dl.*?>/is', '', $html);

    return $html;
}

function matchPageInfo($url) {
    $html = getHtmlContent($url);
    // $matchInfoArr = array();
    preg_match_all('/<ul class=\"slist\">(.*?)<\/ul.*?>/is', $html, $matchInfoArr);
    if(isset($matchInfoArr)) return $matchInfoArr[1][0];
    errorTips($url . " ==> 此链接地址有误！无法获取到数据！");
}

function getPageNum($url){
    $html = getHtmlContent($url);
    // $matchInfoArr = array();
    preg_match_all("/\<a.*?href\=\"(.*?)\"[^>]*>最后一页\<\/a.*?>/i", $html, $matchInfoArr);
    if(!isset($matchInfoArr)) return 1;
    $matchNumArr = preg_split("/[\/\s,]+/", $matchInfoArr[1][0]);
    return substr($matchNumArr[count($matchNumArr) - 2], 1);
}

/**
 * 获取链接地址的相关信息
 * @param  [String]  $url     被解析的链接地址
 * @param  [String]  $referer 引用信息
 * @param  [Integer] $timeout 超时设定
 * @return [Array]           数组结果集
 * 用法：
 * getRedirectUrlInfo("https://www.baidu.com/test.html?a=b")['origin']
 */
function getRedirectUrlInfo($url, $referer = "", $timeout = 10){
    $redirect_url = false;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, TRUE);
    curl_setopt($ch, CURLOPT_NOBODY, TRUE);//不返回请求体内容
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);//允许请求的链接跳转
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
    curl_setopt(
        $ch,
        CURLOPT_HTTPHEADER,
        array(
            "Accept: */*",
            "User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)",
            "Connection: Keep-Alive"
        )
    );
    if($referer) {
        curl_setopt($ch, CURLOPT_REFERER, $referer);//设置referer
    }
    $content = curl_exec($ch);
    if(!curl_errno($ch)) {
        // $redirect_url = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);//获取最终请求的url地址
        $redirect_info = curl_getinfo($ch);
        preg_match('/^((http|ftp|https):\/\/)?[\w-_.]+(\/+)/i', $redirect_info["url"], $matches);
        $redirect_info['origin'] = substr($matches[0], 0, -1);
        $redirect_info['protocol'] = $matches[2];
        $redirect_info['host'] = substr($matches[0], strlen($matches[2]) + 3, -1);
        $urlArr = preg_split("/[\/]+/", $redirect_info['url']);
        $redirect_info['url_end'] = $urlArr[count($urlArr) - 2];
        if($redirect_info['http_code'] == 500) return false;
    }
    // var_dump($redirect_info);
    return $redirect_info;
}

/**
 * 查询 ChinaZ 数据返回 IP 地址相关数据
 * @param  [String] $url 带 IP 地址参数的链接地址
 * @return [Array]     结果集
 * 用法：
 * getIPAddressWithChinaZ('http://ip.tool.chinaz.com/', $ip);
 */
function getIPAddressWithChinaZ($url, $ip){
    $html = getHtmlContent($url.$ip);
    $addressArrs = array();
    preg_match_all(
        '/(<span class="Whwtdhalf w50-0">)(.*?)(<\/span>)/is',
        $html,
        $addressArrs
    );
    //echo $addressArrs[0][1];

    preg_match_all(
        "|<[^>]+>(.*)</[^>]+>|U",
        $addressArrs[0][1],
        $out
    );
    //echo $out[1][0];

    $addressInfo[$ip] = $out[1][0];
    return $addressInfo;
}

/**
 * 查询 ip138 数据返回 IP 地址相关数据
 * @param  [String] $url 带 IP 地址参数的链接地址
 * @return [Array]     结果集
 * 用法：
 * getIPAddressWithIP138('http://ip138.com/ips138.asp?ip=', $ip);
 */
function getIPAddressWithIP138($url, $ip){
    $html = getHtmlContent($url);
    $html = iconv("gb2312", "utf-8//IGNORE", $html);

    $addressArrs = array();
    //如果想只匹配一次，可以用preg_match函数
    preg_match_all('/<li.*?>(.*?)<\/li.*?>/is',$html,$addressArrs);

    //结果已经出来啦
    //var_dump($addressArrs[0][0].'<br>'.$addressArrs[1][0]);
    //print_r($addressArrs[1]);
    $addressArrTmp = "";
    for($i=0, $length = count($addressArrs[1])-3; $i<=$length; $i++){
        //echo $addressArrs[1][$i].'<br>'.strlen($addressArrs[1][$i]).'<br>';
        $curr = strlen($addressArrs[1][$i]);
        $next = strlen($addressArrs[1][$i++]);
        $addressArrTmp = $curr > $next ? $addressArrs[1][$i] : $addressArrs[1][$i++];
    }
    //$addressInfo = explode('：',$addressArrs[1][2]);
    //$addressInfo[$ip] = explode('：',$addressArrs[1][2])[1];
    $addressInfo[$ip] = explode('：',$addressArrTmp)[1];
    //var_dump($addressInfo);
    //print_r(explode('：',$addressArrs[1][2])[1]);

    //把找到了链接和新闻，组装成k=>v形式，这样方便展示到自己的页面上
    //$news = array_combine($addressArrs[1],$addressArrs[2]);
    //var_dump($news);
    return $addressInfo;
}
?>
