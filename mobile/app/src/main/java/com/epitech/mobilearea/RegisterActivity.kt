package com.epitech.mobilearea

import android.content.Intent
import android.os.AsyncTask
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_register.*
import kotlinx.android.synthetic.main.activity_register.button_login
import kotlinx.android.synthetic.main.activity_register.button_register
import kotlinx.android.synthetic.main.activity_register.input_password
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStream
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL

class RegisterActivity : AppCompatActivity()
{

    private inner class NetworkAsyncTask : AsyncTask<String, Int, String>()
    {
        override fun doInBackground(vararg parts: String?): String {
            val requestURL = parts.first()
            val queryString = parts.last()
            var returnv : String = ""

            val connection: HttpURLConnection = URL(requestURL).openConnection() as HttpURLConnection
            connection.requestMethod = "POST"
            connection.doOutput = true

            val outputStream: OutputStream = connection.outputStream
            val outputWriter = OutputStreamWriter(outputStream)
            outputWriter.write(queryString)
            outputWriter.flush()

            BufferedReader(InputStreamReader(connection.inputStream)).use {
                val response = StringBuffer()
                var inputLine = it.readLine()
                while (inputLine != null) {
                    response.append(inputLine)
                    inputLine = it.readLine()
                }
                response.toString()
                returnv = response.toString()
                it.close()
            }
            connection.disconnect()
            return returnv
        }

        override fun onPostExecute(result: String?)
        {
            verifyRegister(result)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        button_register.setOnClickListener {
            if (input_email.text.isEmpty() || input_password.text.isEmpty() || input_name.text.isEmpty() || input_last_name.text.isEmpty()) {
                Toast.makeText(this@RegisterActivity, "Please, fill all fields to register.", Toast.LENGTH_SHORT).show()
            } else {
                progressBar_register.visibility = View.VISIBLE
                sendRegisterRequest(input_email.text.toString(), input_password.text.toString(), input_name.text.toString(), input_last_name.text.toString())
            }
        }

        button_login.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            startActivity(intent)
        }
    }

    private fun sendRegisterRequest(userMail: String, password: String, userName: String, userLastname: String) {
        NetworkAsyncTask().execute("http://${ip}:${port}/register", "email=${userMail}&password=${password}&name=${userName}&lastname=${userLastname}")
    }

    fun verifyRegister(response: String?) {
        progressBar_register.visibility = View.INVISIBLE
        if (response is String) {
            var responseJson = JSONObject(response)
            Toast.makeText(
                this@RegisterActivity,
                "${responseJson.getString("message")}",
                Toast.LENGTH_SHORT
            ).show()
        }
    }
}
