<?php
    
    function editDescription($requestData, $urlList){
        global $Link;

        $isValidated = true;
        $validationErrors = [];

        $dealId = $urlList[3];
        // echo $dealId;

        // Проверяем существование дела
        $existingDeal = $Link->query("SELECT * FROM deal WHERE id = '$dealId'")->fetch_assoc();

        if (is_null($existingDeal)) {
            setHTTPSStatus("404", "No deal with such id");
            return;
        }
        
        $description = $requestData->body->description;

        if(strlen($description)<1){
            $isValidated = false;
            $validationErrors[] = ["description", "Description is less then 1 character"];
                    
        }

                
        if(!$isValidated){
            $validationMessage = "";
            foreach($validationErrors as $err){
                $validationMessage .= "$err[0]: $err[1] \n";
            }
            setHTTPSStatus("400", $validationMessage);
            return;
        }

        $dealEditResult = $Link->query("UPDATE deal SET description = '$description' WHERE id = '$dealId'");


        if (!$dealEditResult){
            echo "Проверьте данные, что-то пошло не так";
                        
        }
        else{
            echo "Дело было успешно отредактировано";
        }
        
    }