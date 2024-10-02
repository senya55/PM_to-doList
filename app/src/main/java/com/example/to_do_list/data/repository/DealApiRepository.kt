package com.example.to_do_list.data.repository

import android.net.Network
import com.example.to_do_list.data.model.ChangeDealModel
import com.example.to_do_list.data.model.CreateDealModel
import com.example.to_do_list.data.model.DealModel
import com.example.to_do_list.data.model.StatusModel
import com.example.to_do_list.data.network.ApiService

class DealApiRepository {
    suspend fun getDeals(): List<DealModel>{
        return ApiService.dealApiService.getDeals()
    }

    suspend fun createDeal(deal: CreateDealModel){
        return ApiService.dealApiService.createDeal(deal)
    }

    suspend fun changeStatus(id: String, status: StatusModel){
        return ApiService.dealApiService.changeStatus(id, status)
    }

    suspend fun deleteDeal(id: String){
        return ApiService.dealApiService.deleteDeal(id)
    }

    suspend fun changeDealDescription(id: String, description: ChangeDealModel){
        return ApiService.dealApiService.changeDealDescription(id, description)
    }
}