package com.example.to_do_list

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.lifecycle.ViewModelProvider
import com.example.to_do_list.presentation.screen.DealScreen
import com.example.to_do_list.presentation.screen.viewmodel.DealViewModel
import com.example.to_do_list.ui.theme.TodolistTheme

class MainActivity : ComponentActivity() {

    private lateinit var viewModel: DealViewModel
    private lateinit var createFileLauncher: ActivityResultLauncher<Intent>
    private lateinit var selectFileLauncher: ActivityResultLauncher<Intent>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        viewModel = ViewModelProvider(this)[DealViewModel::class.java]

        createFileLauncher = registerForActivityResult(
            ActivityResultContracts.StartActivityForResult()
        ) { result ->
            if (result.resultCode == RESULT_OK) {
                val fileUri = result.data?.data ?: return@registerForActivityResult
                viewModel.saveDealsToUri(this, fileUri)
            }
        }

        selectFileLauncher = registerForActivityResult(
            ActivityResultContracts.StartActivityForResult()
        ) { result ->
            if (result.resultCode == RESULT_OK) {
                val fileUri = result.data?.data ?: return@registerForActivityResult
                viewModel.loadDealsFromUri(this, fileUri)
            }
        }

        setContent {
            TodolistTheme {
                DealScreen(viewModel)
            }
        }
    }

    fun createFile() {
        val intent = Intent(Intent.ACTION_CREATE_DOCUMENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "application/json"
            putExtra(Intent.EXTRA_TITLE, "deals.json")
        }
        createFileLauncher.launch(intent)
    }

    fun selectFile() {
        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "application/json"
        }
        selectFileLauncher.launch(intent)
    }
}