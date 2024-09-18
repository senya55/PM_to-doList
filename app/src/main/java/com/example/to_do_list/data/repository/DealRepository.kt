package com.example.to_do_list.data.repository

import android.content.Context
import android.content.SharedPreferences
import com.example.to_do_list.data.model.DealModel
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

private const val DEALS_KEY = "deals_key"

class DealRepository(private val context: Context) {

    private val sharedPreferences: SharedPreferences by lazy {
        context.getSharedPreferences("deal_prefs", Context.MODE_PRIVATE)
    }

    private val gson = Gson()

    fun saveDeals(dealList: List<DealModel>) {
        val json = gson.toJson(dealList)
        sharedPreferences.edit().putString(DEALS_KEY, json).apply()
    }

    fun loadDeals(): List<DealModel> {
        val json = sharedPreferences.getString(DEALS_KEY, null) ?: return emptyList()
        val type = object : TypeToken<List<DealModel>>() {}.type
        return gson.fromJson(json, type)
    }
}