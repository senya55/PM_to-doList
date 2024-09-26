<?php
    include_once "dealFunction/addDeal.php";
    include_once "dealFunction/editDescription.php";
    include_once "dealFunction/getListOfDeals.php";
    include_once "dealFunction/deleteDeal.php";
    include_once "dealFunction/editStatus.php";
    include_once "dealFunction/saveListOfDeals.php";
    function route($method, $urlList, $requestData){
        global $Link;
        switch ($method) {
            case 'GET':
                getListOfDeals($requestData);
                break;

            case 'POST':
                switch($urlList[2]){
                    case "deal":
                        addDeal($requestData);
                        break;
                    
                    case "listOfDeals":
                        saveListOfDeals($requestData);
                        break;

                    default:
                        setHTTPSStatus("404", "There is no such method here");
                    break;
                    }
                                
                break;

            case 'PUT':
                switch($urlList[2]){
                    case "description":
                        editDescription($requestData, $urlList);
                        break;
                    
                    case "status":
                        editStatus($requestData, $urlList);
                        break;

                    default:
                        setHTTPSStatus("404", "There is no such method here");
                    break;
                    }
                
                break;

            case 'DELETE':
                deleteDeal($urlList);
                break;
            
            default:
                setHTTPSStatus("404", "There is no such method here");
                break;
        }
    }