<?php 

function editStatus($requestData, $urlList) { 
    global $Link; 

    $isValidated = true; 
    $validationErrors = []; 

    $dealId = $urlList[3]; 

    // Проверяем существование дела 
    $existingDeal = $Link->query("SELECT * FROM deal WHERE id = '$dealId'")->fetch_assoc(); 

    if (is_null($existingDeal)) { 
        setHTTPSStatus("404", "No deal with such id"); 
        return; 
    } 

    $status = $requestData->body->status; 

    // Проверяем, что статус не пустой
    // if (strlen($status) < 1) { 
    //     $isValidated = false; 
    //     $validationErrors[] = ["status", "Status is less than 1 character"]; 
    // }

    

    // if (!$isValidated) { 
    //     $validationMessage = ""; 
    //     foreach ($validationErrors as $err) { 
    //         $validationMessage .= "$err[0]: $err[1] \n"; 
    //     } 
    //     setHTTPSStatus("400", $validationMessage); 
    //     return; 
    // } 

    // Обновляем статус дела
    $dealEditResult = $Link->query("UPDATE deal SET status = '$status' WHERE id = '$dealId'"); 

    if (!$dealEditResult) { 
        setHTTPSStatus("500", "Проверьте данные, что-то пошло не так: " . $Link->error); 
    } else { 
        echo "Статус дела был успешно отредактирован"; 
    } 
} 
