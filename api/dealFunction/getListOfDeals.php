<?php
    
    function getListOfDeals($requestData){
        global $Link;

        // Выполняем запрос к базе данных для получения всех дел
    $dealsResult = $Link->query("SELECT id, name, description, status FROM deal"); 

    // Проверяем, был ли выполнен запрос успешно
    if (!$dealsResult) { 
        setHTTPSStatus("500", "Ошибка при получении списка дел: " . $Link->error); 
        return; 
    } 

    // Проверяем, есть ли результаты
    if ($dealsResult->num_rows === 0) { 
        echo json_encode([]); // Возвращаем пустой массив, если дел нет
        return; 
    } 

    // Собираем все дела в массив
    $deals = []; 
    while ($row = $dealsResult->fetch_assoc()) { 
        $deals[] = $row; 
    } 

    // Возвращаем список дел в формате JSON
    //header('Content-Type: application/json'); 
    echo json_encode($deals); 
        
    }