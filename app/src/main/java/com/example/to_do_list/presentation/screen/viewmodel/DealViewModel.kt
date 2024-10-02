package com.example.to_do_list.presentation.screen.viewmodel

import android.app.Application
import android.content.Context
import android.net.Uri
import android.widget.Toast
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.to_do_list.data.model.ChangeDealModel
import com.example.to_do_list.data.model.CreateDealModel
import com.example.to_do_list.data.model.DealModel
import com.example.to_do_list.data.model.StatusModel
import com.example.to_do_list.data.repository.DealApiRepository
import com.example.to_do_list.data.repository.DealRepository
import com.example.to_do_list.domain.state.DealState
import com.google.gson.Gson
import com.google.gson.JsonSyntaxException
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStreamWriter

class DealViewModel(
    private val application: Application
) : AndroidViewModel(application) {
    private val _dealState = MutableStateFlow(DealState())
    val dealState: StateFlow<DealState> = _dealState.asStateFlow()

    private val repository = DealRepository(application)
    private val apiRepository = DealApiRepository()

    init {
        loadDeals()
    }

    fun loadDeals() {
        viewModelScope.launch {
            val deals = apiRepository.getDeals()
            _dealState.value = DealState(dealList = deals)
        }
    }

    fun updateCreateDealOpen() {
        _dealState.update { it.copy(isCreateDealOpen = !it.isCreateDealOpen) }
    }

    fun updateDeleteDealOpen() {
        _dealState.update { it.copy(isDeleteDealOpen = !it.isDeleteDealOpen) }
    }

    fun updateUpdateDealOpen() {
        _dealState.update { it.copy(isUpdateDealOpen = !it.isUpdateDealOpen) }
    }

    fun updateReadDealOpen() {
        _dealState.update { it.copy(isReadDialogOpen = !it.isReadDialogOpen) }
    }

    private fun saveDeals(){
        repository.saveDeals(dealState.value.dealList)
    }

    fun createNewDeal(name: String, description: String) {
        val newDeal = CreateDealModel(
            name = name,
            description = description,
            status = 0
        )
        viewModelScope.launch {
            apiRepository.createDeal(newDeal)
            loadDeals()
        }
        updateCreateDealOpen()
    }

    fun updateDeal(newDescription: String) {
        val id = dealState.value.selectedDealId ?: return

        val dealDescription = ChangeDealModel(newDescription)
        viewModelScope.launch {
            apiRepository.changeDealDescription(id, dealDescription)
            loadDeals()
        }

        updateUpdateDealOpen()
    }

    fun deleteDeal() {
        val id = dealState.value.selectedDealId ?: return
        viewModelScope.launch {
            apiRepository.deleteDeal(id)
            loadDeals()
        }
        updateDeleteDealOpen()
    }

    fun changeDealStatus(id: String, currentStatus: Int) {
        val newStatus = if (currentStatus == 1) 0 else 1
        val statusModel = StatusModel(newStatus)
        viewModelScope.launch {
            apiRepository.changeStatus(id, statusModel)
            loadDeals()
        }
    }

    fun setSelectedDeal(id: String?) {
        _dealState.update { it.copy(selectedDealId = id) }
    }

    fun findDealById(id: String?): DealModel? {
        return _dealState.value.dealList.find { it.id == id }
    }

//    private fun generateId(): String {
//        return if (_dealState.value.dealList.isEmpty()) {
//            "1"
//        } else {
//            _dealState.value.dealList.maxOf { it.id } + 1
//        }
//    }

    fun saveDealsToUri(context: Context, uri: Uri) {
        try {
            val contentResolver = context.contentResolver
            val json = Gson().toJson(dealState.value.dealList)
            contentResolver.openOutputStream(uri)?.use { outputStream ->
                OutputStreamWriter(outputStream).use { writer ->
                    writer.write(json)
                }
            }
        } catch (e: Exception) {
            Toast.makeText(application, "Ошибка создания файла", Toast.LENGTH_SHORT).show()
        }
    }

    fun loadDealsFromUri(context: Context, uri: Uri) {
        viewModelScope.launch {
            try {
                context.contentResolver.openInputStream(uri)?.use { inputStream ->
                    BufferedReader(InputStreamReader(inputStream)).use { reader ->
                        val json = reader.readText()
                        val deals = Gson().fromJson(json, Array<DealModel>::class.java).toList()
                        _dealState.update { it.copy(dealList = deals) }
                    }
                }
                saveDeals()
            } catch (e: JsonSyntaxException) {
                Toast.makeText(application, "Ошибка загрузки", Toast.LENGTH_SHORT).show()
            } catch (e: Exception) {
                Toast.makeText(application, "Ошибка загрузки", Toast.LENGTH_SHORT).show()
            }
        }
    }
}