<?php  

function saveListOfDeals($requestData) {  
    global $Link;  

    $isValidated = true;  
    $validationErrors = [];  
    $deals = $requestData->body->deals; // Предполагаем, что данные приходят как массив объектов

    foreach ($deals as $deal) {
        $name = $deal->name;  
        $description = $deal->description;  
        $status = $deal->status;  
        $id = generate_uuid();  

        if (strlen($name) < 1) {  
            $isValidated = false;  
            $validationErrors[] = ["name", "Name is less than 1 character for deal with ID: $id"];  
        }  
    }

    if (!$isValidated) {  
        $validationMessage = "";  
        foreach ($validationErrors as $err) {  
            $validationMessage .= "$err[0]: $err[1] \n";  
        }  
        setHTTPSStatus("400", $validationMessage);  
        return;  
    } 
    
    // Удаление всех существующих дел
    $deleteResult = $Link->query("DELETE FROM deal");
    if (!$deleteResult) {
        echo "Ошибка при удалении существующих дел: " . $Link->error . "\n";
        return;
    }

    foreach ($deals as $deal) {
        $name = $deal->name;  
        $description = $deal->description;  
        $status = $deal->status;  
        $id = generate_uuid();  

        $dealInsertResult = $Link->query("INSERT INTO deal(id, name, description, status) VALUES('$id', '$name', '$description', '$status')");  

        if (!$dealInsertResult) {  
            echo "Проверьте данные для дела с ID: $id, что-то пошло не так\n";  
        } else {  
            echo "Дело с ID: $id было успешно добавлено\n";  
        }  
    }  
} 
