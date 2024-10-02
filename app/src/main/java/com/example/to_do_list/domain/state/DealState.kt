package com.example.to_do_list.domain.state

import com.example.to_do_list.data.model.DealModel

//val fakeDeal1 = DealModel(
//    id = 1,
//    name = "Сделать мобилку",
//    description = "Я колбаса",
//    status = true
//)
//

data class DealState(
    val dealList: List<DealModel> = emptyList(),
    val isCreateDealOpen: Boolean = false,
    val isDeleteDealOpen: Boolean = false,
    val isUpdateDealOpen: Boolean = false,
    val isReadDialogOpen: Boolean = false,

    val selectedDealId: String? = null
)
