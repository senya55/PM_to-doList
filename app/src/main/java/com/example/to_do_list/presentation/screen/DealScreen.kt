package com.example.to_do_list.presentation.screen

import android.annotation.SuppressLint
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddCircleOutline
import androidx.compose.material.icons.filled.DownloadForOffline
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Save
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.example.to_do_list.MainActivity
import com.example.to_do_list.presentation.screen.component.dialog.CreateDealDialog
import com.example.to_do_list.presentation.screen.component.DealItem
import com.example.to_do_list.presentation.screen.component.dialog.DeleteDealDialog
import com.example.to_do_list.presentation.screen.component.EmptyDealScreen
import com.example.to_do_list.presentation.screen.component.dialog.ReadDealDialog
import com.example.to_do_list.presentation.screen.component.dialog.UpdateDealDialog
import com.example.to_do_list.presentation.screen.viewmodel.DealViewModel

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DealScreen(
    viewModel: DealViewModel
){
    val dealState by viewModel.dealState.collectAsState()
    val context = LocalContext.current

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(text = "TO-DO-List")
                },
                actions = {
                    IconButton(
                        onClick = { viewModel.loadDeals() },
                        modifier = Modifier
                            .size(48.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Refresh,
                            contentDescription = "Обновить",
                            modifier = Modifier.size(36.dp)
                        )
                    }

                    IconButton(
                        onClick = { viewModel.updateCreateDealOpen() },
                        modifier = Modifier
                            .size(48.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.AddCircleOutline,
                            contentDescription = "Добавить",
                            modifier = Modifier.size(36.dp)
                        )
                    }



//                    IconButton(
//                        onClick = { (context as? MainActivity)?.selectFile() },
//                        modifier = Modifier
//                            .size(48.dp)
//                    ) {
//                        Icon(
//                            imageVector = Icons.Default.DownloadForOffline,
//                            contentDescription = "Загрузить",
//                            modifier = Modifier.size(36.dp)
//                        )
//                    }

                    IconButton(
                        onClick = { (context as? MainActivity)?.createFile() },
                        modifier = Modifier
                            .size(48.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Save,
                            contentDescription = "Сохранить",
                            modifier = Modifier.size(36.dp)
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color.LightGray
                )
            )
        },
        content = { paddingValues ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                ) {
                    if (dealState.dealList.isEmpty()) {
                        EmptyDealScreen()
                    } else {
                        LazyColumn {
                            items(dealState.dealList) { deal ->
                                DealItem(
                                    deal = deal,
                                    onStatusChange = { viewModel.changeDealStatus(deal.id, deal.status) },
                                    onClick = {
                                        viewModel.setSelectedDeal(deal.id)
                                        viewModel.updateReadDealOpen()
                                    },
                                    onEdit = {
                                        viewModel.setSelectedDeal(deal.id)
                                        viewModel.updateUpdateDealOpen()
                                    },
                                    onDelete = {
                                        viewModel.setSelectedDeal(deal.id)
                                        viewModel.updateDeleteDealOpen()
                                    }
                                )
                            }
                        }
                    }
                }
            }
        }
    )

    if (dealState.isCreateDealOpen){
        CreateDealDialog(
            onCreate = { name, description -> viewModel.createNewDeal(name, description) },
            onDismiss = { viewModel.updateCreateDealOpen() }
        )
    }

    if (dealState.isDeleteDealOpen){
        DeleteDealDialog(
            onDelete = { viewModel.deleteDeal() },
            onDismiss = { viewModel.updateDeleteDealOpen() }
        )
    }

    if (dealState.isUpdateDealOpen){
        viewModel.findDealById(dealState.selectedDealId)?.let {
            UpdateDealDialog(
                onUpdate = { newDescription -> viewModel.updateDeal(newDescription) },
                onDismiss = { viewModel.updateUpdateDealOpen() },
                deal = it
            )
        }
    }

    if (dealState.isReadDialogOpen){
        viewModel.findDealById(dealState.selectedDealId)?.let {
            ReadDealDialog(
                onDismiss = { viewModel.updateReadDealOpen() },
                deal = it
            )
        }
    }
}