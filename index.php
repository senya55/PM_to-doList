<?php
    include_once 'helpers/headers.php';
    // include_once 'helpers/validation.php';
    include_once 'helpers/uuid.php';
    

    global $Link, $UploadDir;

    function getData($method){
        $data = new stdClass();
        if($method != "GET"){
            
            $data->body = json_decode(file_get_contents('php://input')); 
        }

        $data->parameters = [];
            $dataGet = $_GET;
            foreach ($dataGet as $key => $value) {
                if ($key != "q"){
                    $data->parameters[$key] = $value;
                }
            }
        return $data;
    }

    function getMethod(){
        return $_SERVER['REQUEST_METHOD'];
    }

    //header('Content-type: application/json');
    //пишу фронт, появилась ошибка blocked by CORS policy. Добавила необходимые заголовки, теперь все работает
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    header('Content-Type: application/json');
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method == "OPTIONS") {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
        header("HTTP/1.1 200 OK");
        die();
    }

    $Link = mysqli_connect("db", "backend", "backend", "backend_toDo_list");
    $UploadDir = "uploads";

    if(!$Link){
        setHTTPSStatus("500", "DB Connection error: ".mysqli_connect_error());
        exit;
    }

 
    //если есть q
    $url = isset($_GET['q']) ? $_GET['q'] : '';
    $url = rtrim($url, '/');
    $urlList = explode('/', $url);


    $router2 = $urlList[0];
    $router = $urlList[1];
    $requestData = getData(getMethod());
    $method = getMethod();


    if(file_exists(realpath(dirname(__FILE__)).'/' . $router2 . '/'. $router. '.php')){
        include_once 'api/' . $router . '.php';
        route($method, $urlList, $requestData);
    }

    else{
        setHTTPSStatus("404", "There is no such path (index.php)");
    }

    
    mysqli_close($Link);
    return;

    
?>