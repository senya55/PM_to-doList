<?php 

function deleteDeal($urlList) { 
    global $Link; 

    $dealId = $urlList[2]; 

    // Проверяем существование дела
    $existingDeal = $Link->query("SELECT * FROM deal WHERE id = '$dealId'")->fetch_assoc(); 

    if (is_null($existingDeal)) { 
        setHTTPSStatus("404", "No deal with such id"); 
        return; 
    } 

    // Удаляем дело из базы данных
    $deleteResult = $Link->query("DELETE FROM deal WHERE id = '$dealId'"); 

    if (!$deleteResult) { 
        setHTTPSStatus("500", "Ошибка при удалении дела: " . $Link->error); 
        return; 
    } else { 
        echo "Дело было успешно удалено"; 
    } 
}
