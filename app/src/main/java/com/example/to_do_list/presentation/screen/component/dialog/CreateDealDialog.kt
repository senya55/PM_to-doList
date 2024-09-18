package com.example.to_do_list.presentation.screen.component.dialog

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Color.Companion.Green
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties

@Composable
fun CreateDealDialog(
     onCreate: (String, String) -> Unit,
     onDismiss: () -> Unit
){
    val name = remember { mutableStateOf("") }
    val description = remember { mutableStateOf("") }

    Dialog(
        onDismissRequest = {
            onDismiss()
        },
        properties = DialogProperties(
            usePlatformDefaultWidth = false
        ),
    ) {
        Surface(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            shape = RoundedCornerShape(8.dp),
            color = MaterialTheme.colorScheme.surface
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Absolute.spacedBy(4.dp)
            ) {

                Text(
                    text = "Создать дело",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.W400
                )

                OutlinedTextField(
                    value = name.value,
                    onValueChange = { name.value = it },
                    label = { Text(text = "Заголовок") },
                    maxLines = 1,
                    modifier = Modifier.fillMaxWidth()
                )

                OutlinedTextField(
                    value = description.value,
                    onValueChange = { description.value = it },
                    label = { Text(text = "Описание") },
                    maxLines = 10,
                    modifier = Modifier
                        .fillMaxWidth()
                        .heightIn(min = 106.dp)
                )

                Row(
                    horizontalArrangement = Arrangement.End,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    TextButton(
                        onClick = onDismiss
                    ) {
                        Text("Отменить")
                    }

                    Spacer(modifier = Modifier.width(8.dp))

                    TextButton(
                        enabled = name.value.isNotEmpty() && description.value.isNotEmpty(),
                        onClick = {
                            onCreate(name.value, description.value)
                        },
                        colors = ButtonDefaults.textButtonColors(
                            contentColor = Green,
                            disabledContentColor = Color.LightGray
                        )
                    ) {
                        Text("Cоздать")
                    }
                }
            }
        }
    }
}

@Preview
@Composable
fun CreateDealDialogPreview(){
    CreateDealDialog(
        onCreate = { _, _ -> },
        onDismiss = {}
    )
}