<?php
    
    function addDeal($requestData){
        global $Link;

        $isValidated = true;
        $validationErrors = [];

        $name = $requestData->body->name;
        $description = $requestData->body->description;
        $status = $requestData->body->status;
        $id = generate_uuid();

        if(strlen($name)<1){
            $isValidated = false;
            $validationErrors[] = ["name", "Name is less then 1 character"];
                    
        }

                
        if(!$isValidated){
            $validationMessage = "";
            foreach($validationErrors as $err){
                $validationMessage .= "$err[0]: $err[1] \n";
            }
            setHTTPSStatus("400", $validationMessage);
            return;
        }

        $dealInsertResult = $Link->query("INSERT INTO deal(id, name, description, status) VALUES('$id', '$name', '$description', '$status')");
                    

        if (!$dealInsertResult){
            echo "Проверьте данные, что-то пошло не так";
                        
        }
        else{
            echo "Дело было успешно добавлено";
        }
        
    }