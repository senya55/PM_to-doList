package com.example.to_do_list.data.network

import com.example.to_do_list.data.model.ChangeDealModel
import com.example.to_do_list.data.model.CreateDealModel
import com.example.to_do_list.data.model.DealModel
import com.example.to_do_list.data.model.StatusModel
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface DealApiService {
    @GET("api/deal")
    suspend fun getDeals(): List<DealModel>

    @POST("api/deal/deal")
    suspend fun createDeal(@Body deal: CreateDealModel)

    @PUT("api/deal/status/{id}")
    suspend fun changeStatus(@Path("id") id: String, @Body status: StatusModel)

    @DELETE("api/deal/{id}")
    suspend fun deleteDeal(@Path("id") id: String)

    @PUT("api/deal/description/{id}")
    suspend fun changeDealDescription(@Path("id") id: String, @Body description: ChangeDealModel)
}